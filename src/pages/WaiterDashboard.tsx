import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MOCK_ORDERS = [
  { id: 101, table: '', status: 'pending', items: ['Margherita Pizza', 'Paneer Tikka'] },
  { id: 102, table: '5', status: 'pending', items: ['Veg Burger'] },
  { id: 103, table: '', status: 'served', items: ['Masala Dosa'] },
];

const WaiterDashboard: React.FC = () => {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const assignTable = (id: number, table: string) => {
    setOrders(orders => orders.map(o => o.id === id ? { ...o, table } : o));
  };
  const markServed = (id: number) => {
    setOrders(orders => orders.map(o => o.id === id ? { ...o, status: 'served' } : o));
  };

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto py-12"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: 'spring' }}
    >
      <motion.h2
        className="font-bold text-2xl mb-10 text-blue-600 text-center tracking-tight flex items-center justify-center gap-2 animate-fade-in"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        {/* Waiter icon */}
        <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-400 mr-1"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path d="M8 16h8M8 12h8M8 8h8" strokeWidth="2" /></svg>
        Waiter Dashboard
      </motion.h2>
      <div className="space-y-10">
        {orders.map((order, i) => (
          <motion.div
            key={order.id}
            className="relative bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row md:items-center md:justify-between border border-gray-200 overflow-hidden animate-fade-in"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.7, type: 'spring' }}
            whileHover={{ y: -6, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.12)' }}
          >
            <div>
              <div className="font-bold text-lg text-gray-900 mb-1 tracking-tight animate-fade-in">Order #{order.id}</div>
              <div className="text-gray-500 text-sm mb-1 animate-fade-in">Items: {order.items.join(', ')}</div>
              <div className="text-blue-500 text-sm mb-2 animate-fade-in">Status: <span className={order.status === 'served' ? 'text-green-500' : 'text-yellow-500'}>{order.status}</span></div>
              <div className="flex items-center gap-2 animate-fade-in">
                <span className="text-gray-500">Table:</span>
                <input
                  className="border border-gray-300 rounded px-2 py-1 w-16 bg-gray-50 text-gray-900"
                  value={order.table}
                  onChange={e => assignTable(order.id, e.target.value)}
                  disabled={order.status === 'served'}
                />
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2 animate-fade-in">
              {order.status !== 'served' && (
                <motion.button
                  className="bg-blue-600 text-white px-7 py-2 rounded-full font-bold shadow hover:bg-blue-700 transition-all duration-300 text-lg scale-100 hover:scale-105 animate-fade-in"
                  onClick={() => markServed(order.id)}
                  whileTap={{ scale: 0.97 }}
                >
                  Mark as Served
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WaiterDashboard;
