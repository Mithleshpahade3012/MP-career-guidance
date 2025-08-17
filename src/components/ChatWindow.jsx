import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaUser } from "react-icons/fa";

export default function ChatWindow({ messages, onSend, title }) {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  const safeMessages = Array.isArray(messages) ? messages : [];

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [safeMessages.length, isTyping]);

  const handleSend = () => {
    const value = input.trim();
    if (!value) return;
    if (typeof onSend === "function") onSend(value);
    setInput("");
    setIsTyping(true);

    setTimeout(() => setIsTyping(false), 1500);
  };

  const bubbleVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <div className="flex h-[80vh] w-full max-w-6xl mx-auto rounded-2xl shadow-2xl overflow-hidden p-2">
      {/* Background Career Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')", // career/guidance image
        }}
      />
      {/* Overlay gradient for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-indigo-900/40 to-cyan-900/40" />

      {/* Chat Window */}
      <div className="relative z-10 flex flex-col flex-1 max-w-6xl mx-auto w-3/4 h-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <header className="p-3 text-black font-semibold text-lg bg-white shadow flex items-center justify-between">
          <span>{title || "Career Mentor Chat"}</span>
          <span className="flex items-center text-xs bg-green-500 px-2 py-1 rounded-full shadow">
            🟢 Online
          </span>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 relative">
          <AnimatePresence>
            {safeMessages.map((msg, i) => {
              const isBot = msg?.sender === "bot";
              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={bubbleVariants}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`flex items-end ${isBot ? "" : "justify-end"}`}
                >
                  {isBot && <FaRobot className="text-blue-500 mr-2" />}
                  <div
                    className={`relative p-3 rounded-2xl max-w-[75%] shadow ${
                      isBot
                        ? "bg-gray-100 text-black"
                        : "bg-slate-800 text-white"
                    }`}
                  >
                    {msg?.text}
                  </div>
                  {!isBot && <FaUser className="text-blue-500 ml-2" />}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center text-gray-500 space-x-2"
            >
              <FaRobot className="text-blue-500" />
              <div className="flex space-x-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
              </div>
            </motion.div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <footer className="p-2 flex gap-4 border-t bg-white backdrop-blur">
          <input
            type="text"
            className="flex-1 p-3 border rounded-xl focus:ring focus:ring-blue-200 outline-none transition-all"
            placeholder="Type your career question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleSend}
            className="px-5 py-3 bg-cyan-600 text-white rounded-xl hover:bg-cyan-900 transition"
          >
            Send
          </motion.button>
        </footer>
      </div>
    </div>
  );
}
