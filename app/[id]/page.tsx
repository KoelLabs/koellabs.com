'use client';

import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/base/button';
import { FeedbackGiver } from '@/components/FeedbackGiver';

export default function TranscriptionPage() {
  const [transcription, setTranscription] = useState('');
  const [score, setScore] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<Array<[string, string]>>([]);
  const [top3Feedback, setTop3Feedback] = useState<Array<[string, string]>>([]);
  const [scoredWords, setScoredWords] = useState<
    Array<{
      word: string;
      pscore: number;
      wordCorrect: boolean;
      highlight: boolean;
    }>
  >([]);

  const feedbackGiverRef = useRef<any>(null);

  useEffect(() => {
    const target = 'ɔliŋkɑɹdsʔɑɹðəweɪvəvðifjutʃɹ';
    const target_by_word = [
      ['Calling', 'ɔliŋ'],
      ['cards', 'kɑɹdsʔ'],
      ['are', 'ɑɹ'],
      ['the', 'ðə'],
      ['wave', 'weɪv'],
      ['of', 'əv'],
      ['the', 'ði'],
      ['future', 'fjutʃɹ'],
    ];

    const handleTranscription = async (newTranscription: string) => {
      setTranscription(newTranscription);
      if (feedbackGiverRef.current) {
        const [scoredWordsData, overall] = await feedbackGiverRef.current.getCER();
        setScore(Math.round(1000 * overall) / 10);

        setScoredWords(prev =>
          prev.map((word, i) => ({
            ...word,
            pscore: scoredWordsData[i]?.[2] || 0,
          })),
        );
      }
    };

    feedbackGiverRef.current = new FeedbackGiver(target, target_by_word, handleTranscription);

    // Initialize scored words
    setScoredWords(
      target_by_word.map(([word]) => ({
        word,
        pscore: 0,
        wordCorrect: false,
        highlight: false,
      })),
    );

    return () => {
      if (feedbackGiverRef.current) {
        feedbackGiverRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    setIsRecording(true);
    if (feedbackGiverRef.current) {
      setScoredWords(prev =>
        prev.map(word => ({
          ...word,
          pscore: 0,
          wordCorrect: false,
          highlight: false,
        })),
      );
      await feedbackGiverRef.current.start();
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    if (feedbackGiverRef.current) {
      await feedbackGiverRef.current.stop();
    }
  };

  const analyzeFeedback = async () => {
    if (feedbackGiverRef.current) {
      const [perWordFeedback, top3] = await feedbackGiverRef.current.getFeedback();
      setFeedback(perWordFeedback);
      setTop3Feedback(top3);
    }
  };

  const getWordStyle = (word: (typeof scoredWords)[0]) => {
    if (!word.pscore) return {};

    if (word.wordCorrect || word.pscore > 0.8) {
      return {
        backgroundColor: `hsl(${word.pscore * 120}, 100%, 50%)`,
      };
    }
    return { backgroundColor: 'red' };
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Real-Time Transcription</h1>

      <div className="space-x-4">
        <Button variant="default" onClick={startRecording} disabled={isRecording}>
          Start
        </Button>
        <Button variant="default" onClick={stopRecording} disabled={!isRecording}>
          Stop
        </Button>
        <Button variant="outline" onClick={analyzeFeedback}>
          Analyze
        </Button>
      </div>

      <div className="space-y-2">
        <p className="text-lg">
          Transcription: <span className="font-medium">{transcription}</span>
        </p>
        <p className="text-lg">
          Accent Similarity: <span className="font-medium">{score}%</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {scoredWords.map((word, index) => (
          <span
            key={index}
            className="px-2 py-1 rounded transition-colors"
            style={getWordStyle(word)}
          >
            {word.word}
          </span>
        ))}
      </div>

      {(feedback.length > 0 || top3Feedback.length > 0) && (
        <div className="space-y-4">
          <div className="space-y-2">
            {feedback.map(([word, feedbackText], index) => (
              <p key={index}>
                <span className="font-medium">{word}:</span> {feedbackText}
              </p>
            ))}
          </div>

          {top3Feedback.length > 0 && (
            <>
              <h2 className="text-xl font-semibold">Top 3 feedback</h2>
              <div className="space-y-2">
                {top3Feedback.map(([word, feedbackText], index) => (
                  <p key={index}>
                    <span className="font-medium">{word}:</span> {feedbackText}
                  </p>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
