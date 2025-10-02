import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../App';

type Role = 'customer' | 'waiter' | 'admin';

const RoleGuard: React.FC<{ role: Role; children: React.ReactNode }> = ({ role, children }) => {
  const { role: currentRole } = useAuth();
  if (currentRole !== role) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default RoleGuard;
