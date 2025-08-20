import { useState } from "react";
import ChatWindow from "../components/ChatWindow";

export default function Guidance() {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (text) => {
    const userMsg = { sender: "user", text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);

    const res = await fetch("https://be5fced64cde.ngrok-free.app/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: text }),
    });
    const data = await res.json();

    const botMsg = { sender: "bot", text: data.answer, timestamp: new Date() };
    setMessages((prev) => [...prev, botMsg]);
  };

  return <ChatWindow messages={messages} onSend={sendMessage} title="Guidance Bot" />;
}
