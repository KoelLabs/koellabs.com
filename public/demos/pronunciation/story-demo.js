/* Story phone demo reused from the portfolio; adapted for the Koel Labs blog. */
(function () {
  const root = document.querySelector('[data-koel-demo]');
  if (!root) return;

  const API_BASE = 'https://server.koellabs.com';
  const VOSK_MODEL_URL =
    'https://ccoreilly.github.io/vosk-browser/models/vosk-model-small-en-us-0.15.tar.gz';
  const SAMPLE_RATE = 16000;
  const story = {
    id: 'h02QUImvqM2h5Uq3qveKyDhqNwXvvEzgNVkeCgwg95Jc',
    title: 'Tin Soldier',
    rank: 'B1',
    videoUrl: 'https://stream.mux.com/f00itTS602TlyZuJTg1TJL00Gjbnfmta3t5G1800QGyFAsA.m3u8',
    posterUrl:
      'https://image.mux.com/f00itTS602TlyZuJTg1TJL00Gjbnfmta3t5G1800QGyFAsA/thumbnail.png?width=640&height=360&time=10',
    steps: [
      {
        clip: [0, 75.8],
        phrase: 'One soldier had only one leg.',
        referenceAudio: 'reference-audios/0212_one_soldier_had_only_one_leg.mp3',
      },
      {
        clip: [75.8, 97],
        phrase: 'He stayed steady and silent all night.',
        referenceAudio: 'reference-audios/0213_he_stayed_steady_and_silent_all_night.mp3',
      },
      {
        clip: [97, 123],
        phrase: 'He fell from the third floor to the street.',
        referenceAudio: 'reference-audios/0214_he_fell_from_the_third_floor_to_the_street.mp3',
      },
      {
        clip: [123, 183.56],
        phrase: 'The boat became dark like a tunnel.',
        referenceAudio: 'reference-audios/0215_the_boat_became_dark_like_a_tunnel.mp3',
      },
      {
        clip: [183.56, 222.48],
        phrase: 'The tin soldier stayed brave in the dark.',
        referenceAudio: 'reference-audios/0216_the_tin_soldier_stayed_brave_in_the_dark.mp3',
      },
      {
        clip: [222.48, 255.28],
        phrase: 'He stayed steadfast until the very end.',
        referenceAudio: 'reference-audios/0217_he_stayed_steadfast_until_the_very_end.mp3',
      },
    ],
  };

  const view = root.querySelector('[data-koel-view]');
  const progress = root.querySelector('[data-koel-progress]');
  const counter = root.querySelector('[data-koel-counter]');

  let stepIndex = 0;
  let mode = 'video';
  let voskModelPromise = null;
  let voskModel = null;
  let recognizer = null;
  let audioContext = null;
  let mediaStream = null;
  let source = null;
  let processor = null;
  let muteNode = null;
  let chunks = [];
  let recordingSampleRate = SAMPLE_RATE;
  let recording = false;
  let analyzing = false;
  let feedback = null;
  let currentLiveIndex = -1;
  let activeTipIndex = 0;
  let expandedTipIndex = -1;
  let completionTimer = null;
  let recordedAudioUrl = null;
  let recordedAudio = null;
  let preloadedVideo = null;
  let preloadedStepIndex = -1;
  let playbackSpeed = 1;
  let recordedLevels = null;
  let sessionId = 0;

  // lucide icons, matching the app's lucide-react-native set
  const ICON_PATHS = {
    play: '<polygon points="6 3 20 12 6 21 6 3"/>',
    pause:
      '<rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/>',
    rotate: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    chevronUp: '<path d="m18 15-6-6-6 6"/>',
    alert:
      '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  };

  function icon(name) {
    return `<svg class="icon icon-${name}" viewBox="0 0 24 24" aria-hidden="true">${ICON_PATHS[name]}</svg>`;
  }

  function setStatus(message) {
    root.dataset.koelStatus = message;
    root.querySelector('[data-koel-status-message]').textContent = message;
  }

  function normalize(text) {
    return String(text || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s']/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function wordsForPhrase(phrase) {
    return normalize(phrase).split(/\s+/).filter(Boolean);
  }

  function displayWordsForPhrase(phrase) {
    return phrase
      .split(/\s+/)
      .map(word => word.replace(/[.?!,;:]$/, ''))
      .filter(Boolean);
  }

  function getSentenceProgress(targetWords, sentence) {
    const spokenWords = normalize(sentence).split(/\s+/).filter(Boolean);
    let targetIndex = 0;
    let spokenIndex = 0;
    let lastMatch = -1;

    while (targetIndex < targetWords.length && spokenIndex < spokenWords.length) {
      if (targetWords[targetIndex] === spokenWords[spokenIndex]) {
        lastMatch = targetIndex;
        targetIndex += 1;
        spokenIndex += 1;
        continue;
      }

      const nextSpokenMatch = spokenWords
        .slice(spokenIndex + 1, spokenIndex + 4)
        .findIndex(word => word === targetWords[targetIndex]);
      if (nextSpokenMatch >= 0) {
        spokenIndex += nextSpokenMatch + 1;
        continue;
      }
      targetIndex += 1;
    }

    return lastMatch;
  }

  function updateProgress() {
    const total = story.steps.length * 2;
    const current = mode === 'done' ? total - 1 : stepIndex * 2 + (mode === 'practice' ? 1 : 0);
    progress.innerHTML = Array.from({ length: total }, (_, index) => {
      const className = index < current ? 'done' : index === current ? 'current' : '';
      // A practice step fills once it's on screen; a clip fills as it plays.
      const fill = index === current && mode !== 'video' ? ' style="--fill: 100%"' : '';
      return `<span class="${className}"${fill}><i></i></span>`;
    }).join('');
    counter.textContent = `${Math.min(total, current + 1)}/${total}`;
  }

  function setClipProgress(fraction) {
    const current = progress.querySelector('span.current');
    if (current)
      current.style.setProperty('--fill', `${Math.max(0, Math.min(1, fraction)) * 100}%`);
  }

  function loadVoskModel() {
    if (voskModelPromise) return voskModelPromise;
    if (!window.Vosk?.createModel) {
      setStatus('Live word highlighting unavailable; pronunciation feedback still works.');
      voskModelPromise = Promise.resolve(null);
      return voskModelPromise;
    }

    voskModelPromise = window.Vosk.createModel(VOSK_MODEL_URL, -1)
      .then(model => {
        voskModel = model;
        setStatus('Live word highlighting ready.');
        return model;
      })
      .catch(() => {
        setStatus('Live word highlighting could not load; pronunciation feedback still works.');
        return null;
      });
    return voskModelPromise;
  }

  async function getReadyVoskModel() {
    if (voskModel) return voskModel;
    if (!voskModelPromise) void loadVoskModel();
    if (!voskModelPromise) return null;
    return Promise.race([
      voskModelPromise,
      new Promise(resolve => {
        window.setTimeout(() => resolve(null), 250);
      }),
    ]);
  }

  function scoreClass(score) {
    if (score > 0.8) return 'score-great';
    if (score > 0.7) return 'score-good';
    if (score > 0.6) return 'score-mid';
    if (score > 0.5) return 'score-yellow';
    if (score > 0.4) return 'score-ok';
    if (score > 0.3) return 'score-low';
    if (score > 0.2) return 'score-poor';
    if (score > 0.1) return 'score-bad';
    return 'score-worst';
  }

  function renderWords(step, result) {
    const targetWords = displayWordsForPhrase(step.phrase);
    const scored = result?.words || [];
    return targetWords
      .map((word, index) => {
        const score = scored[index]?.score;
        const classes = ['koel-word'];
        if (typeof score === 'number') classes.push('scored', scoreClass(score));
        else if (index <= currentLiveIndex) classes.push('live');
        return `<span class="${classes.join(' ')}">${escapeHtml(word)}</span>`;
      })
      .join('');
  }

  function getTipWords(tip, result) {
    const explicit =
      tip.words ||
      tip.target_words ||
      tip.targetWords ||
      tip.affected_words ||
      tip.affectedWords ||
      tip.word ||
      tip.target_word ||
      tip.targetWord;
    if (Array.isArray(explicit)) return explicit.map(word => String(word)).filter(Boolean);
    if (explicit) return [String(explicit)];

    const indices = tip.word_indices || tip.wordIndices || tip.indices;
    if (Array.isArray(indices) && Array.isArray(result?.words)) {
      return indices
        .map(index => result.words[index]?.text || result.words[index]?.word)
        .filter(Boolean);
    }

    return [];
  }

  function feedbackTitle(tip, result) {
    const words = getTipWords(tip, result);
    const title = tip.caption || 'Pronunciation tip';
    if (!words.length) return title;
    const prefix = words.map(word => `'${word}'`).join(', ');
    return `In ${prefix}: ${title}`;
  }

  function escapeHtml(text) {
    return String(text)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function renderVideo(autoplay = false) {
    updateProgress();
    const step = story.steps[stepIndex];
    const [start, end] = step.clip;
    view.innerHTML = `
      <div class="koel-video-card">
        <div class="koel-video-frame" data-koel-video-frame></div>
      </div>
      <div class="koel-video-controls">
        <button class="koel-pill koel-pill-play" type="button" data-koel-watch></button>
        <div class="koel-pill-group">
          <button class="koel-pill koel-pill-speed" type="button" data-koel-speed aria-label="Playback speed"></button>
          <button class="koel-pill" type="button" data-koel-skip>Skip</button>
        </div>
      </div>
    `;

    const frame = view.querySelector('[data-koel-video-frame]');
    const video = takePreparedVideo(stepIndex);
    frame.append(video);
    video.playbackRate = playbackSpeed;
    const watchButton = view.querySelector('[data-koel-watch]');
    const speedButton = view.querySelector('[data-koel-speed]');
    const skipButton = view.querySelector('[data-koel-skip]');

    const setWatchState = playing => {
      watchButton.innerHTML = `${icon(playing ? 'pause' : 'play')}<span>${playing ? 'Pause' : 'Play'}</span>`;
    };
    const setSpeedLabel = () => {
      speedButton.textContent = `${playbackSpeed}x`;
      speedButton.setAttribute('aria-label', `Playback speed ${playbackSpeed}x`);
    };
    setWatchState(false);
    setSpeedLabel();

    const playClip = async () => {
      if (video.currentTime < start || video.currentTime >= end) video.currentTime = start;
      video.playbackRate = playbackSpeed;
      await video.play();
      setWatchState(true);
      setStatus('Playing story clip...');
    };

    watchButton.addEventListener('click', async () => {
      try {
        if (video.paused) {
          await playClip();
        } else {
          video.pause();
          setWatchState(false);
          setStatus('Clip paused.');
        }
      } catch (error) {
        console.warn('Story clip playback failed:', error);
        setStatus('The clip could not start. Try Play again, or skip to practice.');
      }
    });
    // Same cycle as the app: 1.25 -> 1 -> 0.75 -> 0.5 -> 1.25
    speedButton.addEventListener('click', () => {
      const speeds = [1.25, 1, 0.75, 0.5];
      playbackSpeed = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
      video.playbackRate = playbackSpeed;
      setSpeedLabel();
    });
    video.addEventListener('timeupdate', () => {
      if (mode !== 'video') return;
      setClipProgress((video.currentTime - start) / (end - start));
      if (video.currentTime >= end) {
        video.pause();
        mode = 'practice';
        feedback = null;
        activeTipIndex = 0;
        currentLiveIndex = -1;
        prepareNextClip();
        setStatus('Repeat the phrase, then select Start Practice.');
        renderPractice();
      }
    });
    video.addEventListener('pause', () => setWatchState(false));
    video.addEventListener('play', () => setWatchState(true));
    video.addEventListener('error', () => {
      setStatus('Video preview is limited in this browser; pronunciation practice still works.');
    });
    skipButton.addEventListener('click', () => {
      video.pause();
      mode = 'practice';
      feedback = null;
      activeTipIndex = 0;
      expandedTipIndex = -1;
      currentLiveIndex = -1;
      prepareNextClip();
      setStatus('Repeat the phrase, then select Start Practice.');
      renderPractice();
    });
    if (autoplay) {
      void playClip().catch(() => {
        setStatus('This browser cannot autoplay the next clip here; press play to continue.');
      });
    }
  }

  function createStoryVideo() {
    const video = document.createElement('video');
    video.dataset.koelVideo = '';
    video.playsInline = true;
    video.preload = 'auto';
    video.poster = story.posterUrl;
    attachHls(video);
    return video;
  }

  function attachHls(video) {
    if (video.dataset.koelHlsAttached) return;
    video.dataset.koelHlsAttached = 'true';
    if (window.Hls?.isSupported()) {
      const hls = new window.Hls({ enableWorker: true });
      hls.loadSource(story.videoUrl);
      hls.attachMedia(video);
      return;
    }
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = story.videoUrl;
      return;
    }
    setStatus('Video preview is limited in this browser; pronunciation practice still works.');
  }

  function prepareNextClip() {
    const nextIndex = stepIndex + 1;
    if (nextIndex >= story.steps.length || preloadedStepIndex === nextIndex) return;
    const video = createStoryVideo();
    video.muted = true;
    video.addEventListener(
      'loadedmetadata',
      () => {
        try {
          video.currentTime = story.steps[nextIndex].clip[0];
        } catch {
          // Some browsers reject early HLS seeks; playback will seek again before starting.
        }
      },
      { once: true },
    );
    preloadedVideo = video;
    preloadedStepIndex = nextIndex;
  }

  function takePreparedVideo(index) {
    if (preloadedVideo && preloadedStepIndex === index) {
      const video = preloadedVideo;
      preloadedVideo = null;
      preloadedStepIndex = -1;
      video.muted = false;
      return video;
    }
    return createStoryVideo();
  }

  function renderPractice() {
    updateProgress();
    if (recordedAudio) {
      recordedAudio.pause();
      recordedAudio = null;
    }
    const step = story.steps[stepIndex];
    view.innerHTML = `
      <div class="koel-practice${feedback ? ' has-feedback' : ''}">
        <div class="koel-header">
          <p class="koel-step-label">Phrase ${stepIndex + 1} of ${story.steps.length}</p>
          <p class="koel-prompt">${escapeHtml(stepIndex === 0 ? 'Try saying this aloud!' : 'Repeat this aloud.')}</p>
        </div>
        <div class="koel-speaking">
          <div class="koel-word-row" data-koel-words>${renderWords(step, feedback)}</div>
          <button class="koel-reference" type="button" data-koel-reference>${icon('play')}<span>Play Audio</span></button>
        </div>
        ${renderFeedback(feedback)}
        <div class="koel-footer">
          ${feedback ? renderPlayback() : ''}
          <div class="koel-footer-actions">
            ${
              feedback
                ? `<button class="koel-retry" type="button" data-koel-retry aria-label="Try again">${icon('rotate')}</button>`
                : ''
            }
            ${renderMainAction()}
          </div>
        </div>
      </div>
    `;

    view.querySelector('[data-koel-record]').addEventListener('click', () => {
      if (recording) void stopRecordingAndAnalyze();
      else if (feedback) goNext();
      else
        void startRecording().catch(async () => {
          recording = false;
          analyzing = false;
          await cleanupRecording();
          setStatus(
            'Microphone access was unavailable. Allow microphone access in your browser and try again.',
          );
          renderPractice();
        });
    });
    view.querySelector('[data-koel-reference]').addEventListener('click', event => {
      const button = event.currentTarget;
      const audio = new Audio(`${API_BASE}/${step.referenceAudio}`);
      const label = button.querySelector('span');
      const reset = () => {
        button.disabled = false;
        label.textContent = 'Play Audio';
      };
      button.disabled = true;
      label.textContent = 'Playing';
      audio.addEventListener('ended', reset, { once: true });
      audio.addEventListener('error', reset, { once: true });
      void audio.play().catch(reset);
    });
    const retry = view.querySelector('[data-koel-retry]');
    if (retry) {
      retry.addEventListener('click', () => {
        feedback = null;
        activeTipIndex = 0;
        expandedTipIndex = -1;
        currentLiveIndex = -1;
        renderPractice();
      });
    }
    view.querySelectorAll('[data-koel-tip-nav]').forEach(button => {
      button.addEventListener('click', () => {
        moveTip(Number(button.dataset.koelTipNav));
      });
    });
    view.querySelectorAll('[data-koel-tip-toggle]').forEach(button => {
      button.addEventListener('click', () => {
        const index = Number(button.dataset.koelTipToggle);
        expandedTipIndex = expandedTipIndex === index ? -1 : index;
        renderPractice();
      });
    });
    const tipStack = view.querySelector('[data-koel-tip-stack]');
    if (tipStack) {
      let startX = 0;
      tipStack.addEventListener('pointerdown', event => {
        startX = event.clientX;
      });
      tipStack.addEventListener('pointerup', event => {
        const delta = event.clientX - startX;
        if (Math.abs(delta) > 28) moveTip(delta < 0 ? 1 : -1);
      });
    }
    const playbackButton = view.querySelector('[data-koel-playback]');
    if (playbackButton) {
      playbackButton.addEventListener('click', () => playRecordedAudio(playbackButton));
    }
  }

  function renderMainAction() {
    if (recording) {
      const heights = [14, 22, 30, 18, 26, 12, 28, 20, 30, 16, 24, 12];
      const bars = heights.map((h, i) => `<i style="--h: ${h}; --i: ${i}"></i>`).join('');
      return `<button class="koel-action recording" type="button" data-koel-record><span class="koel-rec-bars" aria-hidden="true">${bars}</span><span class="sr-only">Stop Recording</span></button>`;
    }
    if (analyzing) {
      return `<button class="koel-action analyzing" type="button" data-koel-record disabled><span class="koel-shimmer">Analyzing Pronunciation</span></button>`;
    }
    if (feedback) {
      return `<button class="koel-action continue" type="button" data-koel-record>Continue</button>`;
    }
    return `<button class="koel-action" type="button" data-koel-record>Start Practice</button>`;
  }

  function moveTip(delta) {
    const tips = feedback?.feedback || [];
    if (!tips.length) return;
    activeTipIndex = (activeTipIndex + delta + tips.length) % tips.length;
    expandedTipIndex = -1;
    renderPractice();
  }

  function goNext() {
    if (stepIndex === story.steps.length - 1) {
      mode = 'done';
      renderDone();
      return;
    }
    stepIndex += 1;
    mode = 'video';
    feedback = null;
    activeTipIndex = 0;
    expandedTipIndex = -1;
    currentLiveIndex = -1;
    setRecordedAudioBlob(null);
    renderVideo(true);
  }

  function renderFeedback(result) {
    if (!result) return '';
    const tips = Array.isArray(result.feedback) ? result.feedback : [];
    if (!tips.length) {
      return `
        <div class="koel-tips">
          <p class="koel-tips-title"><span>Pronunciation Tips</span><i aria-hidden="true"></i></p>
          <div class="koel-tip-stack">
            <section class="koel-tip">
              <div class="koel-tip-top">
                <span class="koel-tip-icon good">${icon('info')}</span>
                <h4>Great job! No major pronunciation tips for this phrase.</h4>
              </div>
              <p class="koel-tip-hint">Continue when you're ready.</p>
            </section>
          </div>
        </div>`;
    }
    const active = Math.min(activeTipIndex, tips.length - 1);
    const expanded = expandedTipIndex === active;
    const tip = tips[active];
    // Cards further back sit 10pt lower and 4% smaller, like the app's swipe stack.
    const behind = [1, 2]
      .filter(depth => depth < tips.length)
      .map(
        depth =>
          `<div class="koel-tip behind" style="--d: ${depth}; --o: ${depth === 1 ? 0.7 : 0.5}" aria-hidden="true"></div>`,
      )
      .join('');
    const count =
      tips.length > 1
        ? `<button class="koel-tip-count" type="button" data-koel-tip-nav="1" aria-label="Tip ${active + 1} of ${tips.length}. Show next tip">${active + 1} of ${tips.length}</button>`
        : `<span class="koel-tip-count">1 of 1</span>`;
    return `
      <div class="koel-tips">
        <p class="koel-tips-title"><span>Pronunciation Tips</span><i aria-hidden="true"></i></p>
        <div class="koel-tip-stack" data-koel-tip-stack>
          ${behind}
          <section class="koel-tip${expanded ? ' expanded' : ''}">
            <div class="koel-tip-top">
              <span class="koel-tip-icon">${icon('alert')}</span>
              <h4>${escapeHtml(feedbackTitle(tip, result))}</h4>
              <button class="koel-tip-chevron" type="button" data-koel-tip-toggle="${active}" aria-expanded="${expanded}" aria-label="${expanded ? 'Hide' : 'Show'} tip details">${icon(expanded ? 'chevronUp' : 'chevronDown')}</button>
            </div>
            <p class="koel-tip-hint">${escapeHtml(
              expanded
                ? tip.details || 'Try the phrase again and focus on the highlighted words.'
                : 'Expand for more details.',
            )}</p>
            ${count}
          </section>
        </div>
      </div>
    `;
  }

  const WAVE_BARS = 66;

  function renderPlayback() {
    const levels = recordedLevels || placeholderLevels();
    const bars = levels
      .map(level => `<i style="--h: ${(2 + level * 15).toFixed(2)}"></i>`)
      .join('');
    return `
      <div class="koel-playback" data-koel-playback-row>
        <button class="koel-playback-button" type="button" data-koel-playback aria-label="Play your recording">${icon('play')}</button>
        <span class="koel-wave" aria-hidden="true">
          <span class="koel-wave-bars">${bars}</span>
          <span class="koel-wave-bars played">${bars}</span>
        </span>
      </div>
    `;
  }

  function placeholderLevels() {
    return Array.from({ length: WAVE_BARS }, (_, i) => {
      const v = 0.35 + 0.3 * Math.sin(i * 0.9) + 0.25 * Math.sin(i * 0.37 + 1);
      return Math.max(0.05, Math.min(1, v));
    });
  }

  // Same shaping as the app's waveform: v = (bar / max) ^ 0.72
  function computeLevels(samples) {
    if (!samples?.length) return null;
    const size = Math.max(1, Math.floor(samples.length / WAVE_BARS));
    const peaks = Array.from({ length: WAVE_BARS }, (_, i) => {
      let sum = 0;
      const startAt = i * size;
      const stopAt = Math.min(samples.length, startAt + size);
      for (let j = startAt; j < stopAt; j += 1) sum += samples[j] * samples[j];
      return Math.sqrt(sum / Math.max(1, stopAt - startAt));
    });
    const max = Math.max(...peaks) || 1;
    return peaks.map(peak => Math.pow(peak / max, 0.72));
  }

  function setRecordedAudioBlob(blob) {
    if (recordedAudio) {
      recordedAudio.pause();
      recordedAudio = null;
    }
    if (recordedAudioUrl) URL.revokeObjectURL(recordedAudioUrl);
    recordedAudioUrl = blob ? URL.createObjectURL(blob) : null;
    if (!blob) recordedLevels = null;
  }

  function playRecordedAudio(button) {
    if (!recordedAudioUrl) return;
    const row = button.closest('[data-koel-playback-row]');
    const setPlaying = playing => {
      button.innerHTML = icon(playing ? 'pause' : 'play');
      button.setAttribute('aria-label', playing ? 'Pause your recording' : 'Play your recording');
    };
    if (recordedAudio && !recordedAudio.paused) {
      recordedAudio.pause();
      return;
    }
    if (!recordedAudio) {
      recordedAudio = new Audio(recordedAudioUrl);
      recordedAudio.addEventListener('timeupdate', () => {
        const fraction = recordedAudio.duration
          ? recordedAudio.currentTime / recordedAudio.duration
          : 0;
        row?.style.setProperty('--played', `${fraction * 100}%`);
      });
      recordedAudio.addEventListener('pause', () => setPlaying(false));
      recordedAudio.addEventListener('play', () => setPlaying(true));
      recordedAudio.addEventListener('ended', () => {
        row?.style.setProperty('--played', '0%');
        recordedAudio = null;
        setPlaying(false);
      });
    }
    void recordedAudio.play().catch(() => setPlaying(false));
  }

  function renderDone() {
    setStatus('Story complete. Continue in Slay Speech for more practice.');
    updateProgress();
    view.innerHTML = `
      <div class="koel-practice">
        <div class="koel-header">
          <p class="koel-step-label">Story Complete</p>
          <p class="koel-prompt">Nice work. You finished the Tin Soldier demo.</p>
          <p class="koel-done-body">The full app includes more stories, translations, review, personalized practice, detailed feedback, and more.</p>
        </div>
        <div class="koel-footer stacked">
          <div class="koel-footer-actions">
            <a class="koel-action" href="https://slayspeech.com" target="_blank" rel="noopener">Download Slay Speech</a>
            <button class="koel-action secondary" type="button" data-koel-restart>Restart Demo</button>
          </div>
        </div>
      </div>
    `;
    view.querySelector('[data-koel-restart]').addEventListener('click', restartDemo);
  }

  // The red exit pill restarts the story, since there is nowhere to exit to in the blog.
  async function restartDemo() {
    sessionId += 1;
    view.querySelectorAll('video').forEach(video => video.pause());
    recording = false;
    analyzing = false;
    await cleanupRecording();
    stepIndex = 0;
    mode = 'video';
    feedback = null;
    activeTipIndex = 0;
    expandedTipIndex = -1;
    currentLiveIndex = -1;
    setRecordedAudioBlob(null);
    setStatus('Play the story clip, or skip ahead to practice the phrase.');
    renderVideo();
  }

  async function startRecording() {
    const step = story.steps[stepIndex];
    const targetWords = wordsForPhrase(step.phrase);
    await cleanupRecording();
    feedback = null;
    currentLiveIndex = -1;
    chunks = [];
    setRecordedAudioBlob(null);
    setStatus('Requesting microphone access...');

    mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        channelCount: 1,
      },
    });

    audioContext = new (window.AudioContext || window.webkitAudioContext)({
      latencyHint: 'interactive',
    });
    recordingSampleRate = audioContext.sampleRate;
    if (audioContext.state === 'suspended') await audioContext.resume();

    const model = await getReadyVoskModel();
    if (model) {
      recognizer = new model.KaldiRecognizer(
        recordingSampleRate,
        JSON.stringify([...targetWords, '[unk]']),
      );
      recognizer.setWords(true);
      recognizer.on('partialresult', message => {
        const nextIndex = getSentenceProgress(targetWords, message.result.partial || '');
        currentLiveIndex = Math.max(currentLiveIndex, nextIndex);
        const wordRow = view.querySelector('[data-koel-words]');
        if (wordRow) wordRow.innerHTML = renderWords(step, null);
        maybeAutoStop(targetWords);
      });
      recognizer.on('result', message => {
        currentLiveIndex = Math.max(
          currentLiveIndex,
          getSentenceProgress(targetWords, message.result.text || ''),
        );
        maybeAutoStop(targetWords);
      });
    }

    source = audioContext.createMediaStreamSource(mediaStream);
    processor = audioContext.createScriptProcessor(4096, 1, 1);
    muteNode = audioContext.createGain();
    muteNode.gain.value = 0;
    processor.onaudioprocess = event => {
      const input = event.inputBuffer.getChannelData(0);
      chunks.push(new Float32Array(input));
      try {
        recognizer?.acceptWaveform(event.inputBuffer);
      } catch {
        // Live highlighting is best-effort; server feedback is the source of truth.
      }
    };
    source.connect(processor);
    processor.connect(muteNode);
    muteNode.connect(audioContext.destination);
    recording = true;
    setStatus(
      model
        ? 'Listening for the target phrase...'
        : 'Recording. Server feedback will run after you stop.',
    );
    renderPractice();
  }

  function maybeAutoStop(targetWords) {
    if (!recording || currentLiveIndex < targetWords.length - 1 || completionTimer) return;
    completionTimer = window.setTimeout(() => {
      completionTimer = null;
      if (recording) void stopRecordingAndAnalyze();
    }, 650);
  }

  async function stopRecordingAndAnalyze() {
    recording = false;
    analyzing = true;
    if (completionTimer) {
      window.clearTimeout(completionTimer);
      completionTimer = null;
    }
    setStatus('Analyzing pronunciation...');
    const rawAudio = flattenChunks(chunks);
    const sourceRate = recordingSampleRate;
    await cleanupRecording();
    renderPractice();

    if (!rawAudio.length) {
      analyzing = false;
      setStatus('No audio captured. Try again for a little longer.');
      renderPractice();
      return;
    }

    const resampled = resampleLinear(rawAudio, sourceRate, SAMPLE_RATE);
    const recordingBlob = encodeWav(resampled, SAMPLE_RATE);
    setRecordedAudioBlob(recordingBlob);
    recordedLevels = computeLevels(resampled);
    const step = story.steps[stepIndex];
    const targetWords = wordsForPhrase(step.phrase);
    const formData = new FormData();
    formData.append('file', recordingBlob, 'recording.wav');
    formData.append(
      'metadata',
      JSON.stringify({
        speaker_id: 'koel_labs_blog_demo',
        analysis_source: 'story',
        story_id: story.id,
        segment_index: stepIndex,
        question_index: 0,
        target_phrase: step.phrase,
      }),
    );

    const requestSession = sessionId;
    let result;
    try {
      const response = await fetch(
        `${API_BASE}/analyze_file?target_words=${encodeURIComponent(JSON.stringify(targetWords))}&topk=5`,
        { method: 'POST', body: formData, signal: AbortSignal.timeout(60000) },
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      result = await response.json();
    } catch (error) {
      result = null;
    }
    if (requestSession !== sessionId) return;
    analyzing = false;
    if (result) {
      feedback = result;
      setStatus('Feedback ready. The colors show word-level pronunciation scores.');
    } else {
      feedback = fallbackFeedback(targetWords);
      setStatus('Live server feedback was unavailable, so this demo is showing sample feedback.');
    }
    renderPractice();
  }

  async function cleanupRecording() {
    if (processor) processor.disconnect();
    if (muteNode) muteNode.disconnect();
    if (source) source.disconnect();
    if (mediaStream) mediaStream.getTracks().forEach(track => track.stop());
    if (recognizer) recognizer.remove();
    if (audioContext) await audioContext.close().catch(() => {});
    if (completionTimer) {
      window.clearTimeout(completionTimer);
      completionTimer = null;
    }
    processor = null;
    muteNode = null;
    source = null;
    mediaStream = null;
    recognizer = null;
    audioContext = null;
  }

  function flattenChunks(parts) {
    const length = parts.reduce((total, part) => total + part.length, 0);
    const merged = new Float32Array(length);
    let offset = 0;
    for (const part of parts) {
      merged.set(part, offset);
      offset += part.length;
    }
    return merged;
  }

  function resampleLinear(samples, fromRate, toRate) {
    if (fromRate === toRate) return samples;
    const nextLength = Math.max(1, Math.round(samples.length * (toRate / fromRate)));
    const next = new Float32Array(nextLength);
    const ratio = (samples.length - 1) / Math.max(1, nextLength - 1);
    for (let i = 0; i < nextLength; i += 1) {
      const position = i * ratio;
      const left = Math.floor(position);
      const right = Math.min(samples.length - 1, left + 1);
      const weight = position - left;
      next[i] = samples[left] * (1 - weight) + samples[right] * weight;
    }
    return next;
  }

  function encodeWav(samples, sampleRate) {
    const bytesPerSample = 2;
    const buffer = new ArrayBuffer(44 + samples.length * bytesPerSample);
    const view = new DataView(buffer);
    const writeString = (offset, value) => {
      for (let i = 0; i < value.length; i += 1) view.setUint8(offset + i, value.charCodeAt(i));
    };
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + samples.length * bytesPerSample, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * bytesPerSample, true);
    view.setUint16(32, bytesPerSample, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, samples.length * bytesPerSample, true);
    let offset = 44;
    for (const sample of samples) {
      const clamped = Math.max(-1, Math.min(1, sample));
      view.setInt16(offset, clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff, true);
      offset += 2;
    }
    return new Blob([buffer], { type: 'audio/wav' });
  }

  function fallbackFeedback(targetWords) {
    return {
      average_score: 0.78,
      words: targetWords.map((word, index) => ({
        text: word,
        score: index % 4 === 0 ? 0.58 : 0.86,
      })),
      feedback: [
        {
          words: targetWords.filter((_, index) => index % 4 === 0).slice(0, 3),
          caption: 'Focus on the highlighted words',
          details:
            'The production app gives model-derived tips for specific sounds. This sample appears only when the demo cannot reach the server.',
        },
      ],
    };
  }

  window.addEventListener('pagehide', () => {
    void cleanupRecording();
    setRecordedAudioBlob(null);
    view.querySelectorAll('video').forEach(video => video.pause());
  });

  root.querySelector('[data-koel-exit]')?.addEventListener('click', () => void restartDemo());
  renderVideo();
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => void loadVoskModel(), { timeout: 1400 });
  } else {
    window.setTimeout(() => void loadVoskModel(), 900);
  }
})();
