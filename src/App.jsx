import { useState, useRef } from 'react';
import { Container, Typography, Button, Paper } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import { OverlaySwitcher } from './components/OverlaySwticher';

function App() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  const handleToggleDictation = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser doesn't support Speech Recognition.");
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.continuous = true;

      recognition.onresult = (event) => {
        const text = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('');
        setTranscript(text);
      };

      recognition.onerror = (e) => {
        console.error('Recognition error:', e.error);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    if (!isListening) {
      recognitionRef.current.start();
      setIsListening(true);
    } else {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Gmail Voice Dictation
      </Typography>

      <OverlaySwitcher />

      <Button
        variant="contained"
        color={isListening ? 'error' : 'primary'}
        startIcon={isListening ? <StopIcon /> : <MicIcon />}
        onClick={handleToggleDictation}
        fullWidth
        sx={{ mb: 2 }}
      >
        {isListening ? 'Stop Dictation' : 'Start Dictation'}
      </Button>

      <Paper variant="outlined" sx={{ p: 2, minHeight: 100 }}>
        <Typography variant="subtitle1" gutterBottom>
          Live Transcript:
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
          {transcript || 'Your speech will appear here...'}
        </Typography>
      </Paper>
    </Container>
  );
}

export default App;
