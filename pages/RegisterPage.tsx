import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('customer');
  const [registered, setRegistered] = useState(false);

  const register = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[70vh]">
      <motion.form
        onSubmit={register}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring' }}
        className="bg-white rounded-2xl shadow-lg p-10 flex flex-col gap-6 border border-gray-200 max-w-sm w-full animate-fade-in"
      >
        <motion.h2
          className="font-bold text-2xl mb-2 text-blue-600 text-center tracking-tight flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {/* Register icon */}
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-400 mr-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Create Account
        </motion.h2>
        <motion.input
          className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-gray-900 text-lg focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          whileFocus={{ scale: 1.03 }}
        />
        <motion.select
          className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-gray-900 text-lg focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          value={role}
          onChange={e => setRole(e.target.value)}
          whileFocus={{ scale: 1.03 }}
        >
          <option value="customer">Customer</option>
          <option value="waiter">Waiter</option>
          <option value="admin">Admin</option>
        </motion.select>
        <motion.button
          className={`bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow transition-all duration-300 mt-2 text-lg hover:bg-blue-700 scale-100 hover:scale-105`}
          type="submit"
          whileTap={{ scale: 0.97 }}
        >
          Register
        </motion.button>
        {registered && <motion.div className="text-green-500 font-bold text-lg text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Registered as {name || 'User'} ({role}) (mock)</motion.div>}
      </motion.form>
    </div>
  );
};

export default RegisterPage;
