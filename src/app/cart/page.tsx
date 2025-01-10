'use client';

import { useCart } from '@/app/context/CartContext';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import './cart.scss';

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();

    if (items.length === 0) {
        return (
            <div className="empty-cart">
                <h1>Votre panier est vide</h1>
                <p>Découvrez nos produits et commencez vos achats</p>
                <Link href="/" className="continue-shopping">
                    Continuer mes achats
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h1>Mon Panier</h1>
            
            <div className="cart-container">
                <div className="cart-items">
                    {items.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.nom} className="item-image" />
                            
                            <div className="item-details">
                                <h3>{item.nom}</h3>
                                <p className="item-price">{(item.prix * 1.2).toFixed(2)} €</p>
                                
                                <div className="quantity-controls">
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        <FaMinus />
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        disabled={item.quantity >= item.stock}
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>

                            <div className="item-total">
                                <p>{(item.prix * 1.2 * item.quantity).toFixed(2)} €</p>
                                <button 
                                    className="remove-item"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h2>Récapitulatif</h2>
                    
                    <div className="summary-row">
                        <span>Sous-total</span>
                        <span>{getTotalPrice().toFixed(2)} €</span>
                    </div>
                    
                    <div className="summary-row">
                        <span>Livraison</span>
                        <span>Calculé à l'étape suivante</span>
                    </div>
                    
                    <div className="summary-row total">
                        <span>Total</span>
                        <span>{getTotalPrice().toFixed(2)} €</span>
                    </div>

                    <Link href="/checkout" className="checkout-button">
                        Procéder au paiement
                    </Link>

                    <Link href="/" className="continue-shopping">
                        Continuer mes achats
                    </Link>
                </div>
            </div>
        </div>
    );
} 