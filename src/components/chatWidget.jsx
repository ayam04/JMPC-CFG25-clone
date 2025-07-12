"use client";
import { useState, useRef, useEffect } from "react";
import { generateGeminiResponse } from "../configs/AImodel";
import { MessageCircle, X } from "lucide-react";

const SUFFIX = "\n\nWrite only in 100 words.";

export default function ChatWidget() {
  /* ---------- state ---------- */
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);          // { sender, text }
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  /* ---------- helpers ---------- */
  const toggle = () => setOpen((o) => !o);
  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  /* ---------- send message ---------- */
  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setInput("");

    try {
      const prompt = `${input}${SUFFIX}`;
      const reply = await generateGeminiResponse(prompt);
      setMessages((prev) => [...prev, { sender: "gemini", text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "gemini", text: "Error: " + err.message },
      ]);
    }
    setLoading(false);
  }

  /* ---------- UI ---------- */
  return (
    <>
      {/* ---------- floating window ---------- */}
      {open && (
        <div className="fixed bottom-24 right-6 sm:right-10 z-[1000] w-72 sm:w-96 max-h-[70vh] flex flex-col rounded-lg border shadow-2xl bg-white animate-[fadeIn_0.15s_ease-out]">
          {/* header */}
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <h2 className="font-semibold text-sm">Gemini Chat</h2>
            <button
              onClick={toggle}
              className="p-1 rounded hover:bg-gray-100 transition"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* messages */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-gray-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg text-sm max-w-xs leading-snug ${
                    m.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* input */}
          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 border-t p-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message…"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "…" : "Send"}
            </button>
          </form>
        </div>
      )}

      {/* ---------- floating chat icon ---------- */}
      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 sm:right-10 z-[1000] flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 focus:outline-none"
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </button>
    </>
  );
}
