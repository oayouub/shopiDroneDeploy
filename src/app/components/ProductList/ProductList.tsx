"use client";

import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import { fetchAllArticles, Product } from '../../../supaBase/supabaseController';

interface ProductListProps {
  category: string;
  searchQuery: string;
  userId?: string | number;
  showUserItems?: boolean;
}

const ProductList = ({ category, searchQuery }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const allProducts = await fetchAllArticles();
        let filteredProducts = allProducts;

        if (category) {
          filteredProducts = filteredProducts.filter(product => 
            product.categorie.toLowerCase() === category.toLowerCase()
          );
        }

        if (searchQuery) {
          filteredProducts = filteredProducts.filter(product =>
            product.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        setProducts(filteredProducts);
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
      }
    };

    loadProducts();
  }, [category, searchQuery]);

  return (
    <div className="product-list">
      <div className="products-grid">
        {products.length === 0 ? (
          <p>Aucun produit trouvé</p>
        ) : (
          products.map((product) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
