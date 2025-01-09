// /app/profile/page.tsx

'use client';

import React, { useContext } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import './Profile.scss';

const ProfilePage: React.FC = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="profile-container">
      <h1>Informations du Profil</h1>
      <p><strong>Nom d'utilisateur :</strong> {user.username}</p>
      <p><strong>Email :</strong> {user.email}</p>
      {/* Ajoutez d'autres informations utilisateur si nécessaire */}
    </div>
  );
};

export default ProfilePage;
