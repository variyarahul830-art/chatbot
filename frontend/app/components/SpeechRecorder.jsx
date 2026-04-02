'use client';

import { useState, useRef } from 'react';
import { startSpeechRecognition } from '../services/speech';
import styles from './SpeechRecorder.module.css';

export default function SpeechRecorder({ onTranscribe, disabled = false }) {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState('');
  
  const speechRecognitionRef = useRef(null);
  const transcriptRef = useRef('');

  // Handle audio recording and transcription
  const handleStartRecording = () => {
    setError(null);
    setFeedback('');
    transcriptRef.current = '';
    handleStartSpeechRecognition();
  };

  // Web Speech API approach (real-time, no backend needed)
  const handleStartSpeechRecognition = () => {
    setIsRecording(true);
    setFeedback('🎤 Listening... Click "Stop" when done');

    speechRecognitionRef.current = startSpeechRecognition(
      (result) => {
        if (result.status === 'listening') {
          setFeedback('🎤 Listening... Click "Stop" when done');
        } else if (result.status === 'processing') {
          if (result.interim) {
            setFeedback(`Interim: ${result.interim}`);
          }
          transcriptRef.current = (result.final + result.interim).trim();
        } else if (result.status === 'stopped') {
          if (transcriptRef.current) {
            // Automatically populate input field with transcribed text
            onTranscribe(transcriptRef.current);
            setFeedback(`✓ Transcribed: "${transcriptRef.current}"`);
            setIsRecording(false);
            transcriptRef.current = '';
            setTimeout(() => setFeedback(''), 2000);
          }
        }
      },
      (errorMsg) => {
        setError(errorMsg);
        setIsRecording(false);
      }
    );
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.stop();
    }
  };

  const handleCancel = () => {
    setIsRecording(false);
    setFeedback('');
    setError(null);
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.abort();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        {isRecording ? (
          <>
            <button
              onClick={handleStopRecording}
              disabled={disabled}
              className={styles.buttonStop}
              title="Stop recording"
            >
              ⏹️ Stop
            </button>
            <button
              onClick={handleCancel}
              className={styles.buttonCancel}
              title="Cancel recording"
            >
              ✕ Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleStartRecording}
            disabled={disabled}
            className={styles.buttonRecord}
            title="Start recording"
          >
            🎤 Speak
          </button>
        )}
      </div>

      {feedback && (
        <div className={styles.feedback}>
          {feedback}
        </div>
      )}

      {error && (
        <div className={styles.error}>
          ❌ {error}
        </div>
      )}


    </div>
  );
}
