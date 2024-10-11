import React, { useState } from 'react';
import axios from 'axios';

const GoogleTTS: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const API_KEY = 'AIzaSyA6VTNzK8e1tYB6HvJxpxGsI070dOO25Bg'; // Replace with your actual API key

  const handleSpeak = async () => {
    if (!text) {
      alert("Please enter some text.");
      return;
    }

    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`;
    const requestData = {
      input: { text },
      voice: { languageCode: 'en-US', name: 'en-US-Wavenet-D', ssmlGender: 'MALE' },
      audioConfig: { audioEncoding: 'MP3' },
    };

    // Log request data for debugging
    console.log('Request Data:', JSON.stringify(requestData, null, 2));

    try {
      const response = await axios.post(url, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const audioContent = response.data.audioContent;
      
      if (audioContent) {
        // Create audio URL from the base64 response
        const audioBlob = new Blob([Uint8Array.from(atob(audioContent), c => c.charCodeAt(0))], { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      } else {
        alert('No audio content received.');
      }
    } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error response:', error.response?.data);
          alert(`Error: ${error.response?.data.error.message || 'An unknown error occurred.'}`);
        } else {
          console.error('Error:', error);
          alert('An error occurred while synthesizing speech.');
        }
      }
      
  };

  return (
    <div>
      <h2>Google Text-to-Speech</h2>
      <textarea
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something to convert to speech"
      />
      <br />
      <button onClick={handleSpeak}>Generate Speech</button>
      {audioUrl && (
        <div>
          <h3>Generated Speech:</h3>
          <audio controls src={audioUrl} />
        </div>
      )}
    </div>
  );
};

export default GoogleTTS;
