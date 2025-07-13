"use client";
import { useState, useRef, useEffect } from "react";
import { generateGeminiResponse, isAIAvailable } from "../configs/AImodel";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Minimize2,
  Maximize2,
  RotateCcw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SUFFIX = "\n\nWrite only in 100 words.";

export default function ChatWidget() {
  /* ---------- state ---------- */
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "gemini",
      text: "Hello! I'm your AI assistant. I can help answer questions about education, science, and your learning journey. What would you like to know?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [aiAvailable, setAiAvailable] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [typingIndicator, setTypingIndicator] = useState(false);
  const messagesEndRef = useRef(null);

  /* ---------- helpers ---------- */
  useEffect(() => {
    setAiAvailable(isAIAvailable());
  }, []);

  const toggle = () => setOpen((o) => !o);
  const toggleMinimize = () => setIsMinimized((m) => !m);
  
  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  
  useEffect(scrollToBottom, [messages]);

  const clearMessages = () => {
    setMessages([{
      sender: "gemini",
      text: "Chat cleared! How can I help you today?",
      timestamp: new Date().toISOString()
    }]);
  };

  /* ---------- send message ---------- */
  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { 
      sender: "user", 
      text: input, 
      timestamp: new Date().toISOString() 
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setTypingIndicator(true);

    if (!aiAvailable) {
      setTimeout(() => {
        setMessages((prev) => [...prev, {
          sender: "gemini", 
          text: "AI service is currently unavailable. Please check if the API key is configured properly.",
          timestamp: new Date().toISOString()
        }]);
        setLoading(false);
        setTypingIndicator(false);
      }, 1000);
      return;
    }

    try {
      const prompt = `${userMsg.text}${SUFFIX}`;
      const reply = await generateGeminiResponse(prompt);
      
      setTimeout(() => {
        setMessages((prev) => [...prev, { 
          sender: "gemini", 
          text: reply,
          timestamp: new Date().toISOString()
        }]);
        setLoading(false);
        setTypingIndicator(false);
      }, 500);
    } catch (err) {
      console.error('Chat error:', err);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { 
            sender: "gemini", 
            text: "Sorry, I'm having trouble responding right now. Please try again later.",
            timestamp: new Date().toISOString()
          },
        ]);
        setAiAvailable(false);
        setLoading(false);
        setTypingIndicator(false);
      }, 1000);
    }
  }

  const chatVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 30 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      transition: { duration: 0.2 }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 30 
      }
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  /* ---------- UI ---------- */
  return (
    <>
      {/* ---------- floating window ---------- */}
      <AnimatePresence>
        {open && (
          <motion.div 
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-24 right-4 sm:right-6 z-[1000] w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 backdrop-blur-lg"
            style={{
              maxHeight: isMinimized ? '60px' : '80vh',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <motion.div
                  className="relative"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-blue-600" />
                  </div>
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <div>
                  <h2 className="font-semibold text-white text-sm">AI Assistant</h2>
                  <p className="text-white/80 text-xs">
                    {typingIndicator ? "Typing..." : "Online"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.button
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={clearMessages}
                  className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                  aria-label="Clear chat"
                >
                  <RotateCcw size={14} className="text-white" />
                </motion.button>
                
                <motion.button
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={toggleMinimize}
                  className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                  aria-label="Minimize chat"
                >
                  {isMinimized ? (
                    <Maximize2 size={14} className="text-white" />
                  ) : (
                    <Minimize2 size={14} className="text-white" />
                  )}
                </motion.button>
                
                <motion.button
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={toggle}
                  className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                  aria-label="Close chat"
                >
                  <X size={14} className="text-white" />
                </motion.button>
              </div>
            </div>

            {/* Messages Container */}
            {!isMinimized && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
                  <AnimatePresence>
                    {messages.map((m, i) => (
                      <motion.div
                        key={i}
                        variants={messageVariants}
                        initial="hidden"
                        animate="visible"
                        className={`flex items-start gap-3 ${
                          m.sender === "user" ? "flex-row-reverse" : ""
                        }`}
                      >
                        {/* Avatar */}
                        <motion.div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            m.sender === "user" 
                              ? "bg-gradient-to-r from-blue-500 to-purple-600" 
                              : "bg-gradient-to-r from-emerald-400 to-cyan-500"
                          }`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {m.sender === "user" ? (
                            <User size={16} className="text-white" />
                          ) : (
                            <Bot size={16} className="text-white" />
                          )}
                        </motion.div>

                        {/* Message Bubble */}
                        <motion.div
                          className={`max-w-xs px-4 py-3 rounded-2xl shadow-lg ${
                            m.sender === "user"
                              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-tr-sm"
                              : "bg-white border border-gray-200 text-gray-800 rounded-tl-sm"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <p className="text-sm leading-relaxed">{m.text}</p>
                          <p className={`text-xs mt-2 opacity-70 ${
                            m.sender === "user" ? "text-white/70" : "text-gray-500"
                          }`}>
                            {new Date(m.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </motion.div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing Indicator */}
                  <AnimatePresence>
                    {typingIndicator && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
                          <Bot size={16} className="text-white" />
                        </div>
                        <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-tl-sm shadow-lg">
                          <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-gray-400 rounded-full"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Infinity,
                                  delay: i * 0.2
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="border-t border-gray-200 bg-white rounded-b-2xl"
                >
                  <form onSubmit={handleSend} className="flex items-center gap-3 p-4">
                    <motion.input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm placeholder-gray-500"
                      placeholder="Type your message..."
                      whileFocus={{ scale: 1.02 }}
                      disabled={loading}
                    />
                    <motion.button
                      type="submit"
                      disabled={loading || !input.trim()}
                      className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                      variants={buttonVariants}
                      initial="idle"
                      whileHover={!loading && input.trim() ? "hover" : "idle"}
                      whileTap={!loading && input.trim() ? "tap" : "idle"}
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles size={16} />
                        </motion.div>
                      ) : (
                        <Send size={16} />
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- floating chat icon ---------- */}
      <motion.button
        onClick={toggle}
        className="fixed bottom-6 right-4 sm:right-6 z-[1000] group"
        variants={buttonVariants}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
        aria-label="Open chat"
      >
        <motion.div className="relative">
          {/* Pulse effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-75"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Main button */}
          <div className="relative w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300">
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} className="text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageCircle size={24} className="text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notification dot */}
          {!open && (
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <span className="text-white text-xs font-bold">!</span>
            </motion.div>
          )}
        </motion.div>
      </motion.button>
    </>
  );
}
