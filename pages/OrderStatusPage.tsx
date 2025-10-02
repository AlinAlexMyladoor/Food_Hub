import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const MOCK_ORDERS = [
  { id: 101, status: 'pending', table: '2', items: ['Margherita Pizza', 'Paneer Tikka'] },
  { id: 102, status: 'served', table: '5', items: ['Veg Burger'] },
];

const OrderStatusPage: React.FC = () => {
  const { id } = useParams();
  const order = MOCK_ORDERS.find(o => String(o.id) === id);
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
          {/* Status icon */}
          <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-400 mr-1"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path d="M9 12l2 2 4-4" strokeWidth="2" /></svg>
          Order Status
        </motion.h2>
        {order ? (
          <>
            <div className="font-semibold text-blue-600 text-lg animate-fade-in">Order #{order.id}</div>
            <div className="mb-1 text-gray-700 animate-fade-in">Table: {order.table}</div>
            <div className="mb-1 text-gray-700 animate-fade-in">Status: <span className={order.status === 'served' ? 'text-green-500' : 'text-yellow-500'}>{order.status}</span></div>
            <div className="mb-2 text-gray-700 animate-fade-in">Items: {order.items.join(', ')}</div>
          </>
        ) : (
          <div className="text-red-500 font-bold text-center animate-fade-in">Order not found.</div>
        )}
      </motion.div>
    </div>
  );
};

export default OrderStatusPage;
