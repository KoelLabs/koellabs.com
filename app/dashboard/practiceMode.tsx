import React, { useEffect, useReducer } from 'react';

export default function PracticeMode({
  isInPracticeSection,
  currentVideo,
  getCurrentSection,
  getWordStyle,
  isRecording,
}) {
  const [, forceWordUpdate] = useReducer(x => x + 1, 0);
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRecording) {
      intervalId = setInterval(() => {
        forceWordUpdate();
        console.log(currentVideo?.practicableSections[getCurrentSection()]?.target_by_word);
      }, 500); // 500ms = 0.5 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRecording]);
  return (
    <div className="m-3">
      {isInPracticeSection() &&
        currentVideo?.practicableSections[getCurrentSection()]?.target_by_word.map(
          (word, index) => (
            <button key={`${index}-${forceWordUpdate}`} style={getWordStyle(index)}>
              {word[0]} + {Math.random()}
            </button>
          ),
        )}
    </div>
  );
}
