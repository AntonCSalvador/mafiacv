import React, { useState, useEffect } from "react";
import axios from "axios";

interface GoogleTTSProps {
  placeholderText?: string; // Prop to accept placeholder text
}

const GoogleTTS: React.FC<GoogleTTSProps> = ({ placeholderText }) => {
  const [text, setText] = useState(placeholderText); // Set the initial text to an empty string
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const handleSpeak = async () => {
    setText(placeholderText);

    if (!text) {
      alert("Please enter some text.");
      return;
    }

    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`;
    const requestData = {
      input: { text },
      voice: {
        languageCode: "en-US",
        name: "en-US-Wavenet-D",
        ssmlGender: "MALE",
      },
      audioConfig: { audioEncoding: "MP3" },
    };

    // Log request data for debugging
    console.log("Request Data:", JSON.stringify(requestData, null, 2));

    try {
      const response = await axios.post(url, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const audioContent = response.data.audioContent;

      if (audioContent) {
        // Create audio URL from the base64 response
        const audioBlob = new Blob(
          [Uint8Array.from(atob(audioContent), (c) => c.charCodeAt(0))],
          { type: "audio/mp3" }
        );
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      } else {
        alert("No audio content received.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error response:", error.response?.data);
        alert(
          `Error: ${
            error.response?.data.error.message || "An unknown error occurred."
          }`
        );
      } else {
        console.error("Error:", error);
        alert("An error occurred while synthesizing speech.");
      }
    }
  };

  // Update text when the user inputs or automatically when component mounts
  useEffect(() => {
    if (placeholderText) {
      setText(placeholderText);
    }
  }, [placeholderText]);

  useEffect(() => {
    if (text) {
      handleSpeak();
    }
  }, [text]);

  return (
    <div>
      <br />
      {audioUrl && (
        <div>
          <audio controls src={audioUrl} />
        </div>
      )}
    </div>
  );
};

export default GoogleTTS;
