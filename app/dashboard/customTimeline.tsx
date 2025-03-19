'use client';

import React, { useRef, useState } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

interface PracticableSection {
  start: number;
  end: number;
}

interface CustomTimelineProps {
  currentTime: number;
  duration: number;
  practicableSections: PracticableSection[];
  onSeek: (newValue: number) => void;
  onTimelineClick: (time: number) => void;
}

export default function CustomTimeline({
  currentTime,
  duration,
  practicableSections,
  onSeek,
  onTimelineClick,
}: CustomTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const isInPracticableSection = (time: number) => {
    return practicableSections.some(section => time >= section.start && time <= section.end);
  };

  const renderHighlightedSections = () => {
    return practicableSections.map((section, index) => {
      const startPercentage = (section.start / duration) * 100;
      const endPercentage = (section.end / duration) * 100;
      const width = endPercentage - startPercentage;

      return (
        <div
          key={index}
          className="absolute h-full bg-blue-500"
          style={{
            left: `${startPercentage}%`,
            width: `${width}%`,
          }}
        />
      );
    });
  };

  return (
    <div
      className="relative h-5 flex items-center cursor-pointer"
      ref={timelineRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={e => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickPosition = (e.clientX - rect.left) / rect.width;
        onTimelineClick(clickPosition * duration);
      }}
    >
      <div className="absolute inset-0 h-1 bg-gray-600/50 rounded-full">
        {renderHighlightedSections()}
        <div
          className="absolute h-full bg-white/90 rounded-full transition-colors"
          style={{
            width: `${(currentTime / duration) * 100}%`,
            backgroundColor: isInPracticableSection(currentTime)
              ? 'rgb(59 130 246 / 0.9)'
              : undefined,
          }}
        />
      </div>
      <SliderPrimitive.Root
        className="relative flex w-full touch-none select-none items-center"
        value={[currentTime]}
        max={duration}
        step={0.1}
        onValueChange={newValue => onSeek(newValue[0])}
        aria-label="Video progress"
      >
        <SliderPrimitive.Track className="relative h-1 w-full grow rounded-full">
          <SliderPrimitive.Range className="absolute h-full rounded-full" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className={`block h-3 w-3 rounded-full bg-white shadow-md transition-opacity absolute top-1/2 -translate-y-1/2 ${
            isHovering ? 'opacity-100' : 'opacity-0'
          } hover:opacity-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500`}
        />
      </SliderPrimitive.Root>
    </div>
  );
}
