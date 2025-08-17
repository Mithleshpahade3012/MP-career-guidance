import { motion } from "framer-motion";

export default function Modal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6 max-w-md text-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Quick Guidance Tip</h2>
        <p className="text-gray-700 mb-6">
          Focus on your strengths, stay informed about MP Govt. opportunities, and believe in your journey.
        </p>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}
