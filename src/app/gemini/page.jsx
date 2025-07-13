"use client";
import { useState, useRef, useEffect } from "react";
import { generateGeminiResponse, isAIAvailable } from "../../../configs/AImodel";

const SUFFIX = "\n\nWrite only in 100 words.";

export default function GeminiChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // { sender: "user" | "gemini", text: string }
  const [loading, setLoading] = useState(false);
  const [aiAvailable, setAiAvailable] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Check if AI is available when component mounts
    setAiAvailable(isAIAvailable());
    if (!isAIAvailable()) {
      setMessages([{
        sender: "gemini",
        text: "AI service is currently unavailable. Please check if the API key is configured properly in your environment variables."
      }]);
    }
  }, []);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setInput("");

    if (!aiAvailable) {
      setMessages((prev) => [...prev, {
        sender: "gemini",
        text: "AI service is currently unavailable. Please check if the API key is configured properly."
      }]);
      setLoading(false);
      return;
    }

    try {
      const prompt = `${input}${SUFFIX}`;
      const response = await generateGeminiResponse(prompt);
      setMessages((prev) => [...prev, { sender: "gemini", text: response }]);
    } catch (err) {
      console.error('Gemini chat error:', err);
      setMessages((prev) => [...prev, { 
        sender: "gemini", 
        text: "Sorry, I'm having trouble responding right now. Please try again later or check if the AI service is properly configured." 
      }]);
      setAiAvailable(false);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Gemini Chat</h2>

      <div className="h-96 overflow-y-auto p-2 border rounded bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {loading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
