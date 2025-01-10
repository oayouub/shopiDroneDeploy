'use client';

import { useState, useContext, useEffect } from 'react';
import { categorie } from '@/app/types/categorie';
import './sell.scss';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../context/AuthContext';
import { supabase } from '@/supaBase/subabase';

export default function Sell() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('1');
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const categories = Object.values(categorie).filter((value) => typeof value === "string");

    useEffect(() => {
        const checkAuth = setTimeout(() => {
            if (!user) {
                router.push('/auth');
            }
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(checkAuth);
    }, [user, router]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImage(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const removeImage = () => {
        setImage(null);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image || !title || !description || !price || !category || !stock) {
            alert('Veuillez remplir tous les champs');
            return;
        }

        setIsSubmitting(true);
        try {
            // Upload de l'image
            const fileExt = image.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;

            const { data: imageData, error: imageError } = await supabase.storage
                .from('images')
                .upload(fileName, image);

            if (imageError) {
                console.error('Erreur upload:', imageError);
                throw imageError;
            }

            // Création de l'article avec l'URL de l'image
            const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${fileName}`;
            
            const { error: articleError } = await supabase
                .from('article')
                .insert({
                    nom: title,
                    description: description,
                    prix: parseFloat(price),
                    categorie: category,
                    stock: parseInt(stock),
                    date_post: new Date().toISOString(),
                    image: imageUrl,
                    id_user: user?.id
                });

            if (articleError) {
                console.error('Erreur article:', articleError);
                throw articleError;
            }

            alert('Article publié avec succès !');
            router.push('/dashboard');
        } catch (error) {
            console.error('Erreur lors de la publication:', error);
            alert('Une erreur est survenue lors de la publication');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    if (!user) {
        return null;
    }

    return (
        <div className="sell-page">
            <div className="sell-container">
                <h1>Vendre un article</h1>
                
                <form className="sell-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-column">
                            <div className="form-section">
                                <h2>Photo de l'article</h2>
                                <p className="hint">Ajoutez une photo de votre article</p>
                                
                                <div className="image-upload-container">
                                    <div className="image-grid">
                                        {previewUrl ? (
                                            <div className="image-preview">
                                                <img src={previewUrl} alt="Preview" />
                                                <button 
                                                    type="button" 
                                                    className="remove-image"
                                                    onClick={removeImage}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ) : (
                                            <label className="upload-box">
                                                <FaCloudUploadAlt size={40} />
                                                <span>Ajouter une photo</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    hidden
                                                />
                                            </label>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h2>Description</h2>
                                <div className="form-group">
                                    <textarea 
                                        id="description" 
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={8}
                                        placeholder="Décrivez votre article..."
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-column">
                            <div className="form-section">
                                <h2>Informations sur l'article</h2>
                                
                                <div className="form-group">
                                    <label htmlFor="title">Titre de l'annonce *</label>
                                    <input 
                                        type="text" 
                                        id="title" 
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="ex: DJI Mini 3 Pro" 
                                        required 
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category">Catégorie *</label>
                                    <select 
                                        id="category" 
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        required
                                    >
                                        <option value="">Sélectionnez une catégorie</option>
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price">Prix *</label>
                                    <div className="price-input">
                                        <input 
                                            type="number" 
                                            id="price" 
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            min="0" 
                                            step="0.01" 
                                            required 
                                        />
                                        <span className="currency">€</span>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="stock">Stock disponible *</label>
                                    <input 
                                        type="number" 
                                        id="stock" 
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                        min="1" 
                                        step="1" 
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="warning-section">
                                <h3>Règles de publication</h3>
                                <ul>
                                    <li>
                                        <span className="dot"></span>
                                        Publiez uniquement des articles en rapport avec l'univers des drones
                                    </li>
                                    <li>
                                        <span className="dot"></span>
                                        Vérifiez que votre article est en état de fonctionnement
                                    </li>
                                    <li>
                                        <span className="dot"></span>
                                        Décrivez précisément l'état de votre article
                                    </li>
                                </ul>
                            </div>

                            <button 
                                type="submit" 
                                className="submit-button"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Publication en cours...' : 'Publier l\'annonce'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
