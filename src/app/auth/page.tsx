// /app/auth/page.tsx

'use client';

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../context/AuthContext';
import './AuthPage.scss';
import { supabase } from '@/supaBase/subabase';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    
    const { login } = useContext(AuthContext);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                // Connexion
                await login(email, password);
                router.push('/'); // Redirection après connexion réussie
            } else {
                // Inscription
                if (password !== confirmPassword) {
                    setError('Les mots de passe ne correspondent pas');
                    return;
                }

                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                        }
                    }
                });

                if (error) throw error;
                
                // Message de succès pour l'inscription
                alert('Inscription réussie ! Veuillez vérifier votre email pour confirmer votre compte.');
                setIsLogin(true);
            }
        } catch (error) {
            console.error('Erreur:', error);
            setError('Une erreur est survenue. Veuillez réessayer.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-tabs">
                    <button 
                        className={`tab ${isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Connexion
                    </button>
                    <button 
                        className={`tab ${!isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Inscription
                    </button>
                </div>

                <div className="auth-form">
                    <h1>{isLogin ? 'Connexion' : 'Inscription'}</h1>
                    
                    {error && <p className="error-message">{error}</p>}
                    
                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    placeholder="Nom complet"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required 
                                />
                            </div>
                        )}
                        
                        <div className="form-group">
                            <input 
                                type="email" 
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="password" 
                                placeholder="Mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>

                        {!isLogin && (
                            <div className="form-group">
                                <input 
                                    type="password" 
                                    placeholder="Confirmer le mot de passe"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required 
                                />
                            </div>
                        )}

                        <button type="submit" className="submit-btn">
                            {isLogin ? 'Se connecter' : "S'inscrire"}
                        </button>
                    </form>

                    {isLogin && (
                        <p className="forgot-password">
                            <a href="#">Mot de passe oublié ?</a>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

