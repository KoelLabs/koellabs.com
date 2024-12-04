'use client';

import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { MediaPlayer, MediaProvider, Poster, Track, useMediaRemote } from '@vidstack/react';
import { DefaultVideoLayout, defaultLayoutIcons } from '@vidstack/react/player/layouts/default';

export default function VideoPlayer({
  src,
  title,
  poster,
  practicableSections,
  onTimeUpdate,
  onSeek,
}) {
  const remote = useMediaRemote();

  return (
    <MediaPlayer
      ref={el => {
        if (el) onSeek?.(remote);
      }}
      src={src}
      viewType="video"
      streamType="on-demand"
      logLevel="warn"
      crossOrigin
      playsInline
      title={title}
      poster={poster}
      onTimeUpdate={e => {
        onTimeUpdate(e.currentTime);
      }}
      className=""
    >
      <MediaProvider>
        <Poster className="vds-poster" />
        <Track src={practicableSections} kind="chapters" default />
      </MediaProvider>
      <DefaultVideoLayout
        thumbnails={poster}
        icons={defaultLayoutIcons}
        className="font-inter"
        slots={{
          googleCastButton: null,
          pipButton: null,
          fullscreenButton: null,
          settingsMenu: null,
        }}
      />
    </MediaPlayer>
  );
}
