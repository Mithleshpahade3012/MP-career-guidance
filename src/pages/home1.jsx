import { useState } from "react";
import Modal from "../components/Modal";
import { motion } from "framer-motion";
import hero from "/hero.jpg";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-lg text-center text-white max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold"
          >
            Shape Your Future with Expert Career Advice
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-lg"
          >
            We connect students with the best career mentors and guidance bots
            for Madhya Pradesh Govt. opportunities.
          </motion.p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            Get Quick Tips
          </button>
        </div>
      </section>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  );
}
