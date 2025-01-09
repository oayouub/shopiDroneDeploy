// /app/dashboard/page.tsx

'use client';

import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Dashboard from '@/app/components/Dashboard/Dashboard';
import { AuthContext } from '@/app/context/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      // Rediriger vers la page d'authentification si l'utilisateur n'est pas authentifié
      router.push('/auth');
    }
  }, [user, router]);

  if (!user) {
    return null; // Ou afficher un composant de chargement
  }

  return <Dashboard />;
};

export default DashboardPage;
