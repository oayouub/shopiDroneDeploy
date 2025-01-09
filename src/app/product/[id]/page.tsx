"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProductById, Product } from "../../../supaBase/supabaseController";

const ProductDetail: React.FC = () => {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id || Array.isArray(id)) {
      setIsLoading(false);
      return;
    }

    const getProduct = async () => {
      setIsLoading(true);
      const productData = await fetchProductById(parseInt(id, 10));
      setProduct(productData);
      setIsLoading(false);
    };

    getProduct();
  }, [id]);

  if (isLoading) {
    return <p>Chargement du produit...</p>;
  }

  if (!product) {
    return <p>Produit non trouvé</p>;
  }

  return (
    <div className="details-item">
      <div className="wrapper -large -padded">
        <div className="grid -three product-grid">
          <div className="col -two -auto">
            {/* Remplacez Image par une balise img */}
            <img
              src={product.image}
              alt={product.nom}
              style={{ width: "100%", height: "auto" }}
              className="product-img"
            />
            <div className="description">
              <div className="title-4 label">Description</div>
              <p className="body desc">{product.description}</p>
            </div>
          </div>
          <div className="col -one -auto right-col">
            <div className="content">
              <div className="title-4">{product.nom}</div>
              <div className="body price">{product.prix} €</div>
              <div className="grid -two category">
                <div className="col -one -auto">
                  <div className="body">Catégorie</div>
                </div>
                <div className="col -one -auto">
                  <div className="body">{product.categorie}</div>
                </div>
              </div>
              <button className="btn add-btn">Ajouter au panier</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
