This is the Tin Soldier phone demo from Alexander Metzger's portfolio:
https://sandergi.com/blog/scaling-human-g2p-supervision.html

Source: /Users/alex/Desktop/CS/Web/Portfolio/assets/js/koel-story-demo.js and the
phone rules from assets/css/refresh.css. The story, video, reference audio,
recording, feedback cards, and phone design are retained. Blog adaptations add
visible status messages, microphone-error handling, a request timeout, a blog
submission identifier, and cleanup on frame exit. This standalone frame loads
lazily in the blog and keeps its scripts and CSS out of other pages.

HLS.js: https://github.com/video-dev/hls.js (v1.6.16, Apache-2.0)
Vosk browser bundle: https://github.com/ccoreilly/vosk-browser (from the portfolio)

The demo calls https://server.koellabs.com/analyze_file. If the service cannot be
reached, the original sample-feedback fallback is clearly identified in the
visible status message. No request for microphone access occurs until the
visitor starts practice.

Caching: the host caches CSS, JS and images for 4 hours but the HTML for only
30 seconds, so index.html references each file with a `?v=<content hash>` query.
After editing phone.css, story-demo.js or anything in assets/, refresh the hashes:

    python3 -c "import hashlib,re;h=open('index.html').read();[h:=re.sub(r'([\"\'])'+re.escape(p)+r'(\?v=\w+)?\1',lambda m,p=p:m[1]+p+'?v='+hashlib.sha1(open(p,'rb').read()).hexdigest()[:8]+m[1],h) for p in ['phone.css','story-demo.js','assets/iphone-17-pro.webp','assets/status-bar.png']];open('index.html','w').write(h)"

(run from public/demos/pronunciation)
