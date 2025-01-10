'use client';

import { useCart } from '@/app/context/CartContext';
import './AddToCart.scss';

interface AddToCartProps {
    article: {
        id: number;
        nom: string;
        prix: number;
        image: string;
        stock: number;
    };
}

export default function AddToCart({ article }: AddToCartProps) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        const cartItem = {
            ...article,
            quantity: 1
        };
        addToCart(cartItem);
    };

    return (
        <button 
            className="add-to-cart-button"
            onClick={handleAddToCart}
            disabled={article.stock === 0}
        >
            {article.stock === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
        </button>
    );
} 