/**
 * Speech-to-Text Service
 * Handles audio recording and transcription
 */


/**
 * Check if browser supports Web Speech API
 * @returns {boolean}
 */
export function isSpeechRecognitionAvailable() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  return Boolean(SpeechRecognition);
}


/**
 * Start listening to browser's speech recognition (real-time)
 * This uses the browser's built-in Web Speech API for faster, real-time transcription
 * @param {Function} onResult - Callback with interim and final results
 * @param {Function} onError - Callback for errors
 * @param {string} language - Language code (e.g., 'en-US')
 * @returns {Object} Controller to stop listening
 */
export function startSpeechRecognition(onResult, onError, language = 'en-US') {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    onError('Speech Recognition not supported in this browser');
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.language = language;
  recognition.continuous = false;
  recognition.interimResults = true;

  recognition.onstart = () => {
    onResult({ status: 'listening' });
  };

  recognition.onresult = (event) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;

      if (event.results[i].isFinal) {
        finalTranscript += transcript + ' ';
      } else {
        interimTranscript += transcript;
      }
    }

    onResult({
      status: 'processing',
      interim: interimTranscript,
      final: finalTranscript,
    });
  };

  recognition.onerror = (event) => {
    onError(`Speech recognition error: ${event.error}`);
  };

  recognition.onend = () => {
    onResult({ status: 'stopped' });
  };

  recognition.start();

  return {
    stop: () => recognition.stop(),
    abort: () => recognition.abort(),
  };
}


