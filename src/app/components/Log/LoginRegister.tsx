'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './LoginRegister.scss';
import { supabase } from '../../../supaBase/subabase';

const LoginRegister: React.FC = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  // États pour le formulaire de connexion
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // États pour le formulaire d'inscription
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');

  // Fonction de gestion de la connexion
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) {
        console.error('Erreur de connexion:', error);
        setLoginError('Email ou mot de passe incorrect.');
      } else {
        console.log('Connexion réussie');
        // Rediriger vers le tableau de bord
        router.push('/');
      }
    } catch (error) {
      console.error('Erreur inattendue:', error);
      setLoginError('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  // Fonction de gestion de l'inscription
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signUp({
        email: registerEmail,
        password: registerPassword,
      });

      if (error) {
        console.error('Erreur d\'inscription:', error);
        setRegisterError('Une erreur est survenue lors de l\'inscription.');
      } else {
        console.log('Inscription réussie');
        setRegisterSuccess('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        setRegisterError('');
        setRegisterEmail('');
        setRegisterPassword('');
      }
    } catch (error) {
      console.error('Erreur inattendue:', error);
      setRegisterError('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <div className="login-register-container">
      <div className="tabs">
        <button
          className={isLogin ? 'active' : ''}
          onClick={() => {
            setIsLogin(true);
            setLoginError('');
            setRegisterError('');
            setRegisterSuccess('');
          }}
        >
          Connexion
        </button>
        <button
          className={!isLogin ? 'active' : ''}
          onClick={() => {
            setIsLogin(false);
            setLoginError('');
            setRegisterError('');
            setRegisterSuccess('');
          }}
        >
          Inscription
        </button>
      </div>

      {isLogin ? (
        <form className="form login-form" onSubmit={handleLogin}>
          <h2>Connexion</h2>
          {loginError && <p className="error">{loginError}</p>}
          <div className="form-group">
            <label htmlFor="login-email">Email :</label>
            <input
              type="email"
              id="login-email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Mot de passe :</label>
            <input
              type="password"
              id="login-password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Se connecter</button>
        </form>
      ) : (
        <form className="form register-form" onSubmit={handleRegister}>
          <h2>Inscription</h2>
          {registerError && <p className="error">{registerError}</p>}
          {registerSuccess && <p className="success">{registerSuccess}</p>}
          <div className="form-group">
            <label htmlFor="register-email">Email :</label>
            <input
              type="email"
              id="register-email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="register-password">Mot de passe :</label>
            <input
              type="password"
              id="register-password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">S'inscrire</button>
        </form>
      )}
    </div>
  );
};

export default LoginRegister;
