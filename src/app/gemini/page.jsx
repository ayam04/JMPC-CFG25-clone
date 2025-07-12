"use client";
import { useState, useRef, useEffect } from "react";
import { generateGeminiResponse } from "../../../configs/AImodel";

const SUFFIX = "\n\nWrite only in 100 words.";

export default function GeminiChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // { sender: "user" | "gemini", text: string }
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setInput("");

    try {
      const prompt = `${input}${SUFFIX}`;
      const response = await generateGeminiResponse(prompt);
      setMessages((prev) => [...prev, { sender: "gemini", text: response }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "gemini", text: "Error: " + err.message }]);
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
