import React from 'react';
import { motion } from 'framer-motion';

const order = {
  id: 123,
  items: [
    { name: 'Pizza', qty: 2 },
    { name: 'Burger', qty: 1 },
  ],
  total: 32,
  status: 'Preparing',
};

const OrderPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[70vh]">
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-10 flex flex-col gap-6 border border-gray-200 max-w-md w-full relative animate-fade-in"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring' }}
      >
        <motion.h2
          className="font-bold text-2xl mb-2 text-blue-600 text-center tracking-tight flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {/* Receipt icon */}
          <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-400 mr-1"><rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" /><path d="M8 8h8M8 12h8M8 16h4" strokeWidth="2" /></svg>
          Order Details
        </motion.h2>
        <div className="font-semibold text-blue-600 text-lg animate-fade-in">Order ID: {order.id}</div>
        <div>
          <div className="font-semibold text-gray-700 animate-fade-in">Items:</div>
          <ul className="list-disc ml-6 text-gray-700 animate-fade-in">
            {order.items.map((item, idx) => (
              <li key={idx}>{item.name} <span className="text-xs text-blue-400">x{item.qty}</span></li>
            ))}
          </ul>
        </div>
        <div className="font-bold text-blue-600 text-lg animate-fade-in">Total: ${order.total}</div>
        <div className="font-semibold text-gray-700 animate-fade-in">Status: <span className="text-blue-500 font-bold">{order.status}</span></div>
      </motion.div>
    </div>
  );
};

export default OrderPage;
