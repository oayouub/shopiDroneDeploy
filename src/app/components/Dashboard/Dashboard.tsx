// /app/components/Dashboard/Dashboard.tsx

'use client';

import React, { useContext } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import ProductList from "@/app/components/ProductList/ProductList";

const Dashboard: React.FC = () => {
  const { logout, user } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth');
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Bienvenue, {user?.username}!</h1>
        <button onClick={handleLogout}>Se déconnecter</button>
      </div>
      <div className="wrapper -large -padded">
        <h2>Vous avez {user ? `${user.username} articles` : 'aucun'} en vente</h2>
        <ProductList />
      </div>
    </div>
  );
};

export default Dashboard;
