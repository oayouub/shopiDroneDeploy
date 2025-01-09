'use client';
import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import { fetchAllArticles, Product } from '../../../supaBase/supabaseController';

interface ProductSelectionProps {
  maxArticles?: number; // Nombre d'articles à afficher
  category?: string; // Catégorie à filtrer
}

const ProductSelection: React.FC<ProductSelectionProps> = ({ maxArticles = 15, category = '' }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const articles = await fetchAllArticles();
        const filteredArticles = category
          ? articles.filter((article) => article.categorie === category) // Filtrer par catégorie
          : articles;
        setProducts(filteredArticles.slice(0, maxArticles)); // Limiter le nombre d'articles
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [maxArticles, category]); // Déclenche un rechargement si maxArticles ou category change

  if (isLoading) {
    return <div>Chargement des produits...</div>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
      {products.map((product) => (
        <Card
          key={product.id}
          id={product.id}
          img={product.image}
          name={product.nom}
          price={product.prix}
          description={product.description}
        />
      ))}
    </div>
  );
};

export default ProductSelection;
