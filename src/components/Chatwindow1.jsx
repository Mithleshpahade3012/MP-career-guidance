import { useState } from "react";
import { motion } from "framer-motion";
import { FaRobot, FaUser } from "react-icons/fa";

export default function ChatWindow({ messages, onSend, title }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-3xl mx-auto bg-white border rounded-lg shadow-lg">
      <header className="p-4 bg-blue-500 text-white font-bold text-lg">{title}</header>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start space-x-2 ${msg.sender === "bot" ? "" : "justify-end"}`}
          >
            {msg.sender === "bot" && <FaRobot className="text-blue-500 mt-1" />}
            <div
              className={`p-3 rounded-lg shadow ${
                msg.sender === "bot" ? "bg-gray-100" : "bg-blue-500 text-white"
              }`}
            >
              {msg.text}
              <div className="text-xs text-gray-500 mt-1">
                {msg.timestamp.toLocaleTimeString()}
              </div>
            </div>
            {msg.sender === "user" && <FaUser className="text-blue-500 mt-1" />}
          </motion.div>
        ))}
      </div>
      <footer className="p-4 flex space-x-2 border-t">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </footer>
    </div>
  );
}
