import { useState, useEffect } from 'react';

export type User = { id: string; role: 'customer' | 'waiter' | 'admin'; name: string } | null;

export function useAuth() {
  const [user, setUser] = useState<User>(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  return { user, setUser };
}
