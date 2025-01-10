'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
    id: number;
    nom: string;
    prix: number;
    quantity: number;
    image: string;
    stock: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (itemId: number) => void;
    updateQuantity: (itemId: number, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    // Charger le panier depuis le localStorage au démarrage
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setItems(JSON.parse(savedCart));
        }
    }, []);

    // Sauvegarder le panier dans le localStorage à chaque modification
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (newItem: CartItem) => {
        setItems(currentItems => {
            const existingItem = currentItems.find(item => item.id === newItem.id);
            
            if (existingItem) {
                // Vérifier le stock disponible
                const newQuantity = existingItem.quantity + 1;
                if (newQuantity > existingItem.stock) {
                    alert('Stock insuffisant');
                    return currentItems;
                }
                
                return currentItems.map(item =>
                    item.id === newItem.id
                        ? { ...item, quantity: newQuantity }
                        : item
                );
            }
            
            return [...currentItems, { ...newItem, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId: number) => {
        setItems(currentItems => currentItems.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId: number, quantity: number) => {
        setItems(currentItems =>
            currentItems.map(item => {
                if (item.id === itemId) {
                    if (quantity > item.stock) {
                        alert('Stock insuffisant');
                        return item;
                    }
                    return { ...item, quantity };
                }
                return item;
            })
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const getTotalItems = () => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return items.reduce((total, item) => {
            // Calculer le prix TTC (prix * 1.2)
            return total + (item.prix * 1.2 * item.quantity);
        }, 0);
    };

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getTotalItems,
            getTotalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
} 