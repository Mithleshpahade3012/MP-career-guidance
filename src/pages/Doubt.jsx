import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Doubt() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("chatHistory");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const askDoubt = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://be5fced64cde.ngrok-free.app/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });
      const data = await res.json();
      const botMsg = { role: "bot", text: data.answer || "Sorry, I couldn’t find an answer." };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "bot", text: "Error fetching response." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[90vh] md:h-screen max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Ask Doubt</h2>
      
      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-lg shadow-inner">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-3 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-4xl p-3 rounded-2xl shadow 
                ${msg.role === "user" ? "bg-blue-500 text-white rounded-br-none" : "bg-white text-gray-800 rounded-bl-none"}`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
        {loading && <p className="text-gray-500 italic">AI is typing...</p>}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <div className="mt-4 flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about subject, topic, exams..."
          className="flex-1 p-3 border-2 border-blue-500 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          onKeyDown={(e) => e.key === "Enter" && askDoubt()}
        />
        <button
          onClick={askDoubt}
          disabled={loading}
          className="p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition disabled:opacity-50"
        >
          Ask
        </button>
      </div>
    </div>
  );
}
