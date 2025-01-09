"use client";
import React, { useState } from 'react';
import './Cart.scss';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export default function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            name: "Produit Lorem Ipsum 1",
            price: 99.99,
            quantity: 2,
            image: "https://via.placeholder.com/100"
        },
        {
            id: 2,
            name: "Produit Lorem Ipsum 2",
            price: 149.99,
            quantity: 1,
            image: "https://via.placeholder.com/100"
        },
        {
            id: 3,
            name: "Produit Lorem Ipsum 3",
            price: 79.99,
            quantity: 3,
            image: "https://via.placeholder.com/100"
        },
    ]);

    const updateQuantity = (id: number, change: number) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(0, item.quantity + change) }
                    : item
            ).filter(item => item.quantity > 0)
        );
    };

    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    return (
        <div className="cart-container">
            <h1>Mon Panier</h1>
            
            <div className="cart-items">
                {cartItems.map(item => (
                    <div key={item.id} className="cart-item">
                        <div className="item-image">
                            <img src={item.image} alt={item.name} />
                        </div>
                        <div className="item-details">
                            <h3>{item.name}</h3>
                            <p className="price">{item.price.toFixed(2)} €</p>
                        </div>
                        <div className="quantity-controls">
                            <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                            <span>Quantité : {item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <div className="summary-row">
                    <span>Sous-total</span>
                    <span>{calculateTotal().toFixed(2)} €</span>
                </div>
                <div className="summary-row">
                    <span>Frais de livraison</span>
                    <span>Gratuit</span>
                </div>
                <div className="summary-row total">
                    <span>Total TTC</span>
                    <span>{calculateTotal().toFixed(2)} €</span>
                </div>
                <button className="checkout-button">
                    Procéder au paiement
                </button>
            </div>
        </div>
    );
}