// /app/dashboard/page.tsx

'use client';

import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { supabase } from '@/supaBase/subabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import './dashboard.scss';

interface Article {
    id: number;
    nom: string;
    prix: number;
    stock: number;
    image: string;
    description: string;
}

export default function Dashboard() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        // Attendre que l'état d'authentification soit stable
        const timer = setTimeout(() => {
            if (!user) {
                router.push('/auth');
                return;
            }

            const fetchArticles = async () => {
                try {
                    const { data, error } = await supabase
                        .from('article')
                        .select('*')
                        .eq('id_user', user.id)
                        .order('date_post', { ascending: false });

                    if (error) {
                        console.error('Erreur lors de la récupération des articles:', error);
                        return;
                    }

                    setArticles(data || []);
                } catch (error) {
                    console.error('Erreur:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchArticles();
        }, 500); // Délai pour laisser le temps à l'authentification de se charger

        return () => clearTimeout(timer);
    }, [user, router]);

    // Afficher un loader pendant la vérification
    if (isLoading) {
        return (
            <div className="dashboard-page">
                <div className="loading">Chargement...</div>
            </div>
        );
    }

    // Ne pas rediriger immédiatement, laisser le temps à l'auth de se charger
    if (!user) {
        return null;
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return;

        const { error } = await supabase
            .from('article')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Erreur lors de la suppression:', error);
            return;
        }

        setArticles(articles.filter(article => article.id !== id));
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <h1>Bienvenue, {user?.user_metadata?.full_name || 'Utilisateur'} !</h1>
                <p>Gérez vos articles en vente</p>
            </div>

            <div className="dashboard-content">
                {articles.length === 0 ? (
                    <div className="no-articles">
                        <p>Vous n'avez pas encore d'articles en vente</p>
                        <Link href="/sell" className="add-article-btn">
                            <FaPlus /> Ajouter un article
                        </Link>
                    </div>
                ) : (
                    <div className="articles-grid">
                        {articles.map((article) => (
                            <div key={article.id} className="article-card">
                                <img 
                                    src={article.image} 
                                    alt={article.nom} 
                                    className="article-image"
                                />
                                <div className="article-content">
                                    <h3>{article.nom}</h3>
                                    <div className="article-price">{article.prix} €</div>
                                    <div className="article-stock">Stock: {article.stock}</div>
                                    <div className="article-actions">
                                        <button 
                                            className="edit"
                                            onClick={() => router.push(`/edit/${article.id}`)}
                                        >
                                            Modifier
                                        </button>
                                        <button 
                                            className="delete"
                                            onClick={() => handleDelete(article.id)}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
