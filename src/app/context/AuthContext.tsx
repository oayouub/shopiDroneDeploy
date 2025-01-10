'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../../supaBase/subabase';
import { useRouter } from 'next/navigation';
import Notification from '../components/Notification/Notification';

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
});

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
  }>({ message: '', type: 'success', isVisible: false });
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    // Écoute les changements d'état de l'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    fetchSession();

    // Nettoyer la souscription lors du démontage du composant
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type, isVisible: true });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setUser(data?.user);
      showNotification('Vous êtes connecté avec succès !', 'success');
    } catch (error) {
      console.error('Erreur de connexion:', error);
      showNotification('Erreur de connexion', 'error');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      showNotification('Vous avez été déconnecté', 'error');
      setTimeout(() => {
        router.push('/auth');
      }, 100);
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Notification 
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
      />
      {children}
    </AuthContext.Provider>
  );
};
