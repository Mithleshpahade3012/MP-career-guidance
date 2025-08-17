    import { useState } from "react";
import { motion } from "framer-motion";

export default function Doubt() {
  const [questions, setQuestions] = useState([]);
  const [input, setInput] = useState("");

  const askDoubt = async () => {
    if (!input.trim()) return;
    const res = await fetch("https://a5d54d68c2ae.ngrok-free.app/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: input }),
    });
    const data = await res.json();

    setQuestions([{ q: input, a: data.answer, badge: "Recently Asked" }, ...questions]);
    setInput("");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Ask a Doubt</h2>
      <div className="flex mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your doubt..."
          className="flex-1 p-2 border-2 border-blue-500 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          onKeyDown={(e) => e.key === "Enter" && askDoubt()}
        />
        <button
          onClick={askDoubt}
          className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition"
        >
          Ask
        </button>
      </div>
      <div>
        {questions.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-white rounded-lg shadow mb-3"
          >
            <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded text-sm">{item.badge}</span>
            <p className="font-semibold mt-2">{item.q}</p>
            <p className="text-gray-700 mt-1">{item.a}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
