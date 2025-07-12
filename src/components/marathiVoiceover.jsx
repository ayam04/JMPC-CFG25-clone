"use client";

import { useEffect, useState } from "react";

export default function MarathiVoiceover() {
  const [speaking, setSpeaking] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (utterance) {
        window.speechSynthesis.cancel();
      }
    };
  }, [utterance]);

  const handleStart = () => {
    if (!window.speechSynthesis) {
      alert("Speech Synthesis not supported in this browser.");
      return;
    }

    // Get all visible text on the page (you can adjust this as needed)
    const text = document.body.innerText;

    if (text.trim() === "") {
      alert("No text found to read.");
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Create new utterance
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "mr-IN"; // Marathi language code

    // Optional: set voice if available
    const voices = window.speechSynthesis.getVoices();
    const marathiVoice = voices.find((v) => v.lang === "mr-IN" || v.lang.startsWith("mr"));
    if (marathiVoice) {
      utter.voice = marathiVoice;
    }

    utter.onend = () => {
      setSpeaking(false);
      setUtterance(null);
    };

    setUtterance(utter);
    setSpeaking(true);
    window.speechSynthesis.speak(utter);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setUtterance(null);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2 bg-white p-2 rounded shadow-lg">
      {!speaking ? (
        <button onClick={handleStart} className="btn">
          🔊 Start Marathi Voiceover
        </button>
      ) : (
        <button onClick={handleStop} className="btn">
          ⏹️ Stop Voiceover
        </button>
      )}
    </div>
  );
}
