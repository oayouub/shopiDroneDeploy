// /app/components/Providers/ClientProvider.tsx

'use client';

import React from 'react';
import { AuthProvider } from '@/app/context/AuthContext';

interface Props {
  children: React.ReactNode;
}

const ClientProvider: React.FC<Props> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default ClientProvider;
