
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { motion } from 'framer-motion';

// Mock users database (kitchen added)
const USERS = [
  { username: 'waiter', password: 'waiter', role: 'waiter' },
   { username: 'kitchen', password: 'kitchen', role: 'kitchen' },
  { username: 'admin', password: 'admin', role: 'admin' },
  
];

const LoginPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'none' | 'customer' | 'waiter' | 'admin' | 'kitchen'>('none');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setRole, setUsername: setAuthUsername } = useAuth();

  // Called when choosing a role from the first screen
  const chooseRole = (role: 'customer' | 'waiter' | 'admin' | 'kitchen') => {
    setError('');
    setSelectedRole(role);
    // If Customer: set role and navigate immediately (no credentials)
    if (role === 'customer') {
      setRole('customer');
      setAuthUsername('Guest'); // or blank / choose a table flow
      navigate('/');
    }
    // For waiter/admin/kitchen we render the credential form below
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // simulate server delay
    setTimeout(() => {
      const user = USERS.find(
        (u) => u.username === username && u.password === password && u.role === selectedRole
      );
      if (!user) {
        setError('Invalid username or password for selected role');
        setLoading(false);
        return;
      }
      // set auth state
      setRole(user.role as any);
      setAuthUsername(user.username);
      setLoading(false);
      // route based on role
      if (user.role === 'waiter') navigate('/waiter');
      else if (user.role === 'kitchen') navigate('/kitchen');
      else if (user.role === 'admin') navigate('/admin');
       // <-- kitchen route
      else navigate('/');
    }, 700);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[70vh]">
      {/* Role selection screen */}
      {selectedRole === 'none' && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4 border border-gray-200 max-w-md w-full"
        >
          <h2 className="text-2xl font-bold text-center text-blue-600">Choose your Role</h2>
          <div className="grid grid-cols-4 gap-4 mt-4">
            <button
              onClick={() => chooseRole('customer')}
              className="py-3 rounded-xl border border-gray-200 hover:bg-gray-50 font-semibold"
            >
              Customer
            </button>
            <button
              onClick={() => chooseRole('waiter')}
              className="py-3 rounded-xl border border-gray-200 hover:bg-gray-50 font-semibold"
            >
              Waiter
            </button>
            <button
              onClick={() => chooseRole('kitchen')}
              className="py-3 rounded-xl border border-gray-200 hover:bg-gray-50 font-semibold"
            >
              Kitchen
            </button>
            <button
              onClick={() => chooseRole('admin')}
              className="py-3 rounded-xl border border-gray-200 hover:bg-gray-50 font-semibold"
            >
              Admin
            </button>
            
          </div>
        </motion.div>
      )}

      {/* Credential form for waiter/admin/kitchen */}
      {(selectedRole === 'waiter' || selectedRole === 'admin' || selectedRole === 'kitchen') && (
        <motion.form
          onSubmit={login}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring' }}
          className="bg-white rounded-2xl shadow-lg p-10 flex flex-col gap-6 border border-gray-200 max-w-sm w-full"
        >
          <motion.h2
            className="font-bold text-2xl mb-2 text-blue-600 text-center tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            {selectedRole === 'waiter' ? 'Waiter Sign In' : selectedRole === 'admin' ? 'Admin Sign In' : 'Kitchen Sign In'}
          </motion.h2>

          <motion.input
            className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-gray-900 text-lg focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-gray-900 text-lg focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            whileFocus={{ scale: 1.02 }}
          />

          {error && (
            <motion.div className="text-red-500 font-bold text-sm text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {error}
            </motion.div>
          )}

          <div className="flex items-center justify-between gap-2">
            <motion.button
              className={`bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow transition-all duration-300 ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-700'}`}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </motion.button>

            <button
              type="button"
              onClick={() => {
                // go back to role picker
                setSelectedRole('none');
                setUsername('');
                setPassword('');
                setError('');
              }}
              className="text-sm underline"
            >
              Back
            </button>
          </div>
        </motion.form>
      )}
    </div>
  );
};

export default LoginPage;
