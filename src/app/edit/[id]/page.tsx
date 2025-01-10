'use client';

import { useState, useEffect, useContext } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { AuthContext } from '@/app/context/AuthContext';
import { supabase } from '@/supaBase/subabase';
import { categorie } from '@/app/types/categorie';
import { FaCloudUploadAlt } from 'react-icons/fa';
import './edit.scss';

interface Article {
    id: number;
    nom: string;
    prix: number;
    description: string;
    categorie: string;
    stock: number;
    image: string;
    id_user: string;
}

export default function EditArticle() {
    const params = useParams();
    const articleId = params?.id as string;
    const [article, setArticle] = useState<Article | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const categories = Object.values(categorie).filter((value) => typeof value === "string");

    useEffect(() => {
        const fetchArticle = async () => {
            if (!user || !articleId) {
                router.push('/auth');
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('article')
                    .select('*')
                    .eq('id', articleId)
                    .single();

                if (error || !data) {
                    console.error('Erreur lors de la récupération de l\'article:', error);
                    router.push('/dashboard');
                    return;
                }

                // Vérifier que l'article appartient à l'utilisateur
                if (data.id_user !== user.id) {
                    router.push('/dashboard');
                    return;
                }

                setArticle(data);
                setTitle(data.nom);
                setDescription(data.description);
                setPrice(data.prix.toString());
                setCategory(data.categorie);
                setStock(data.stock.toString());
                setPreviewUrl(data.image);
            } catch (error) {
                console.error('Erreur:', error);
                router.push('/dashboard');
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticle();
    }, [articleId, user, router]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImage(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const removeImage = () => {
        setImage(null);
        if (previewUrl && !article?.image) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(article?.image || null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description || !price || !category || !stock) {
            alert('Veuillez remplir tous les champs');
            return;
        }

        setIsSubmitting(true);
        try {
            let imageUrl = article?.image;

            if (image) {
                // Upload de la nouvelle image
                const fileExt = image.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;

                const { error: imageError } = await supabase.storage
                    .from('images')
                    .upload(fileName, image);

                if (imageError) throw imageError;

                imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${fileName}`;
            }

            const { error: updateError } = await supabase
                .from('article')
                .update({
                    nom: title,
                    description: description,
                    prix: parseFloat(price),
                    categorie: category,
                    stock: parseInt(stock),
                    image: imageUrl,
                })
                .eq('id', articleId);

            if (updateError) throw updateError;

            alert('Article modifié avec succès !');
            router.push('/dashboard');
        } catch (error) {
            console.error('Erreur lors de la modification:', error);
            alert('Une erreur est survenue lors de la modification');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div className="edit-page">Chargement...</div>;
    }

    return (
        <div className="edit-page">
            <div className="edit-container">
                <h1>Modifier l'article</h1>
                
                <form className="edit-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-column">
                            <div className="form-section">
                                <h2>Photo de l'article</h2>
                                <p className="hint">Modifiez la photo de votre article</p>
                                
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
                                    <label>Titre de l'annonce *</label>
                                    <input 
                                        type="text" 
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="ex: DJI Mini 3 Pro" 
                                        required 
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Catégorie *</label>
                                    <select 
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
                                    <label>Prix *</label>
                                    <div className="price-input">
                                        <input 
                                            type="number" 
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
                                    <label>Stock disponible *</label>
                                    <input 
                                        type="number" 
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                        min="1" 
                                        step="1" 
                                        required 
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className="submit-button"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Modification en cours...' : 'Modifier l\'annonce'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
} 