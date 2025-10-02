import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MOCK_MENU = [
  { id: 1, name: 'Margherita Pizza', price: 299 },
  { id: 2, name: 'Paneer Tikka', price: 249 },
  { id: 3, name: 'Veg Burger', price: 149 },
  { id: 4, name: 'Masala Dosa', price: 129 },
];
const MOCK_ORDERS = [
  { id: 101, table: '2', status: 'pending', items: ['Margherita Pizza', 'Paneer Tikka'] },
  { id: 102, table: '5', status: 'served', items: ['Veg Burger'] },
];
const MOCK_USERS = [
  { id: 1, name: 'Alice', role: 'customer' },
  { id: 2, name: 'Bob', role: 'waiter' },
  { id: 3, name: 'Carol', role: 'admin' },
];

const AdminDashboard: React.FC = () => {
  const [menu, setMenu] = useState(MOCK_MENU);
  const [orders] = useState(MOCK_ORDERS);
  const [users] = useState(MOCK_USERS);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ name: '', price: '' });

  const startEdit = (item: any) => {
    setEditing(item);
    setForm({ name: item.name, price: String(item.price) });
  };
  const saveMenu = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setMenu(menu.map(m => m.id === editing.id ? { ...m, ...form, price: Number(form.price) } : m));
      setEditing(null);
    } else {
      setMenu([...menu, { id: Date.now(), name: form.name, price: Number(form.price) }]);
    }
    setForm({ name: '', price: '' });
  };
  const deleteMenu = (id: number) => setMenu(menu.filter(m => m.id !== id));

  return (
    <motion.div
      className="w-full max-w-6xl mx-auto py-12"
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
        {/* Admin icon */}
        <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-400 mr-1"><rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" /><path d="M8 8h8M8 12h8M8 16h4" strokeWidth="2" /></svg>
        Admin Dashboard
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-10">
        {/* Menu CRUD */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 overflow-hidden animate-fade-in"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7, type: 'spring' }}
        >
          <h3 className="font-bold text-lg mb-4 text-blue-600 animate-fade-in">Menu Items</h3>
          <ul className="mb-4">
            {menu.map((item, i) => (
              <motion.li
                key={item.id}
                className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0 animate-fade-in"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.5, type: 'spring' }}
              >
                <span className="text-gray-900">{item.name} <span className="text-blue-500">₹{item.price}</span></span>
                <span>
                  <button className="text-blue-600 font-bold mr-2 hover:underline" onClick={() => startEdit(item)}>Edit</button>
                  <button className="text-red-400 text-xl hover:text-red-600" onClick={() => deleteMenu(item.id)}>&times;</button>
                </span>
              </motion.li>
            ))}
          </ul>
          <form onSubmit={saveMenu} className="flex flex-col gap-2 mt-2 animate-fade-in">
            <input className="border border-gray-300 rounded px-3 py-2 bg-gray-50 text-gray-900" placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            <input className="border border-gray-300 rounded px-3 py-2 bg-gray-50 text-gray-900" placeholder="Price" type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required />
            <button className="bg-blue-600 text-white px-7 py-2 rounded-full font-bold shadow hover:bg-blue-700 transition-all duration-300 text-lg scale-100 hover:scale-105 animate-fade-in" type="submit">{editing ? 'Save' : 'Add'}</button>
            {editing && <button className="text-gray-400" type="button" onClick={() => setEditing(null)}>Cancel</button>}
          </form>
        </motion.div>
        {/* Orders */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 overflow-hidden animate-fade-in"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, type: 'spring' }}
        >
          <h3 className="font-bold text-lg mb-4 text-blue-600 animate-fade-in">Orders</h3>
          <ul>
            {orders.map((order, i) => (
              <motion.li
                key={order.id}
                className="mb-4 animate-fade-in"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.5, type: 'spring' }}
              >
                <div className="font-semibold text-gray-900">Order #{order.id}</div>
                <div className="text-blue-500 text-sm">Table: {order.table} | Status: {order.status}</div>
                <div className="text-gray-500 text-sm">Items: {order.items.join(', ')}</div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
        {/* Users */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 overflow-hidden animate-fade-in"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.7, type: 'spring' }}
        >
          <h3 className="font-bold text-lg mb-4 text-blue-600 animate-fade-in">Users</h3>
          <ul>
            {users.map((user, i) => (
              <motion.li
                key={user.id}
                className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0 animate-fade-in"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.5, type: 'spring' }}
              >
                <span className="text-gray-900">{user.name}</span>
                <span className="text-blue-500 text-xs">{user.role}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
