'use client';
import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import { fetchAllArticles, Product } from '../../../supaBase/supabaseController';
import './ProductSelection.scss';

interface ProductSelectionProps {
  maxArticles?: number;
  category?: string;
}

const ProductSelection: React.FC<ProductSelectionProps> = ({ maxArticles = 15, category = '' }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const articles = await fetchAllArticles();
        const shuffledArticles = [...articles].sort(() => Math.random() - 0.5);
        const filteredArticles = category
          ? shuffledArticles.filter((article) => article.categorie === category)
          : shuffledArticles;
        const selectedArticles = filteredArticles.slice(0, maxArticles);
        setProducts(selectedArticles);
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [maxArticles, category]);

  if (isLoading) {
    return (
      <div className="product-selection">
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="product-selection">
        <div className="loader-container">
          Aucun produit trouvé dans cette catégorie
        </div>
      </div>
    );
  }

  return (
    <div className="product-selection">
      <div className="products-grid">
        {products.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            img={product.image}
            name={product.nom}
            price={product.prix}
            description={product.description}
            categorie={product.categorie}
            stock={product.stock}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSelection;