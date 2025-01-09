"use client";
import { useState, useEffect, useRef } from "react";
import Card from "../Card/Card";
import { fetchAllArticles, Product, categorie } from "../../../supaBase/supabaseController";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false);

  const categoryFilterRef = useRef<HTMLDivElement | null>(null);
  const priceFilterRef = useRef<HTMLDivElement | null>(null);

  // Fetch articles from Supabase on component mount
  useEffect(() => {
    const getArticles = async () => {
      const articles = await fetchAllArticles();
      setProducts(articles);
    };
    getArticles();
  }, []);

  const maxPriceInProducts = products.length ? Math.max(...products.map((product) => product.prix)) : 0;

  // Extract categories from the enum
  const allCategories = Object.values(categorie).filter((value) => typeof value === "string");

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category]
    );
  };
  
  const filteredProducts = products
    .filter(
      (product) =>
        (product.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (minPrice === "" || product.prix >= minPrice) &&
        (maxPrice === "" || product.prix <= maxPrice) &&
        (selectedCategories.length === 0 || selectedCategories.includes(product.categorie))
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.prix - b.prix;
      if (sortOrder === "desc") return b.prix - a.prix;
      return 0;
    });
  

  const handleApplyFilter = () => {
    setShowPriceFilter(false);
  };

  const handleCategoryFilterToggle = () => {
    setShowCategoryFilter((prev) => !prev);
  };

  const handlePriceFilterToggle = () => {
    setShowPriceFilter((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        categoryFilterRef.current &&
        !categoryFilterRef.current.contains(event.target as Node)
      ) {
        setShowCategoryFilter(false);
      }

      if (
        priceFilterRef.current &&
        !priceFilterRef.current.contains(event.target as Node)
      ) {
        setShowPriceFilter(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div style={{ color: "black", padding: "16px", position: "relative" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "16px 0",
          gap: "16px",
        }}
      >
        <input
          type="text"
          placeholder="Rechercher un produit"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid black",
            width: "250px",
            color: "black",
            backgroundColor: "white",
          }}
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc" | "")}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid black",
            width: "150px",
            color: "black",
            backgroundColor: "white",
          }}
        >
          <option value="">Trier par prix</option>
          <option value="asc">Prix croissant</option>
          <option value="desc">Prix décroissant</option>
        </select>
        <div style={{ position: "relative" }}>
          <button
            onClick={handleCategoryFilterToggle}
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              border: "1px solid black",
              backgroundColor: "white",
              color: "black",
              cursor: "pointer",
            }}
          >
            Catégories
          </button>
          {showCategoryFilter && (
            <div
              ref={categoryFilterRef}
              style={{
                position: "absolute",
                top: "40px",
                left: "0",
                zIndex: 10,
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid black",
                backgroundColor: "white",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                width: "200px",
              }}
            >
              {allCategories.map((category) => (
                <label
                  key={category}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "4px 8px",
                  }}
                >
                  <span style={{ fontSize: "14px", color: "black" }}>{category}</span>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    style={{
                      cursor: "pointer",
                      appearance: "checkbox",
                    }}
                  />
                </label>
              ))}
            </div>
          )}
        </div>
        <div style={{ position: "relative" }}>
          <button
            onClick={handlePriceFilterToggle}
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              border: "1px solid black",
              backgroundColor: "white",
              color: "black",
              cursor: "pointer",
            }}
          >
            Filtrer par prix
          </button>
          {showPriceFilter && (
            <div
              ref={priceFilterRef}
              style={{
                position: "absolute",
                top: "40px",
                left: "0",
                zIndex: 10,
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid black",
                backgroundColor: "white",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                width: "200px",
              }}
            >
              <input
                type="number"
                value={minPrice}
                min="0"
                onChange={(e) => setMinPrice(Number(e.target.value) || "")}
                placeholder="Prix min"
                style={{
                  padding: "6px",
                  borderRadius: "4px",
                  border: "1px solid black",
                  width: "100%",
                  color: "black",
                  backgroundColor: "white",
                  marginBottom: "8px",
                }}
              />
              <input
                type="number"
                value={maxPrice}
                min="0"
                max={maxPriceInProducts}
                onChange={(e) => setMaxPrice(Number(e.target.value) || "")}
                placeholder="Prix max"
                style={{
                  padding: "6px",
                  borderRadius: "4px",
                  border: "1px solid black",
                  width: "100%",
                  color: "black",
                  backgroundColor: "white",
                  marginBottom: "8px",
                }}
              />
              <button
                onClick={handleApplyFilter}
                style={{
                  padding: "6px 8px",
                  borderRadius: "4px",
                  border: "1px solid black",
                  backgroundColor: "black",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "bold",
                  lineHeight: "20px",
                  height: "auto",
                  cursor: "pointer",
                }}
              >
                Appliquer
              </button>
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
          color: "black",
        }}
      >
        {filteredProducts.map((product) => (
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
    </div>
  );
};

export default ProductList;
