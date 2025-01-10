'use client';

import { useEffect } from 'react';
import { useCart } from '@/app/context/CartContext';
import { useRouter } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';
import './confirmation.scss';

export default function ConfirmationPage() {
    const { items, clearCart, getTotalPrice } = useCart();
    const router = useRouter();

    useEffect(() => {
        if (items.length === 0) {
            router.push('/');
        }
    }, [items.length, router]);

    const handleReturnToShop = () => {
        clearCart();
        router.push('/');
    };

    const calculateSubtotalHT = () => {
        return items.reduce((total, item) => total + (item.prix * item.quantity), 0);
    };

    const calculateTVA = () => {
        return calculateSubtotalHT() * 0.2;
    };

    return (
        <div className="confirmation-page">
            <div className="confirmation-container">
                <div className="confirmation-header">
                    <FaCheckCircle className="success-icon" />
                    <h1>Commande confirmée</h1>
                    <p>Merci pour votre achat !</p>
                </div>

                <div className="order-details">
                    <h2>Détails de la commande</h2>
                    <div className="items-list">
                        {items.map((item) => (
                            <div key={item.id} className="order-item">
                                <div className="item-info">
                                    <img src={item.image} alt={item.nom} />
                                    <div>
                                        <h3>{item.nom}</h3>
                                        <p>Quantité: {item.quantity}</p>
                                    </div>
                                </div>
                                <div className="item-prices">
                                    <p>Prix unitaire HT: {item.prix.toFixed(2)} €</p>
                                    <p>Prix unitaire TTC: {(item.prix * 1.2).toFixed(2)} €</p>
                                    <p className="total-price">Total: {(item.prix * 1.2 * item.quantity).toFixed(2)} €</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="order-summary">
                        <div className="summary-row">
                            <span>Sous-total HT</span>
                            <span>{calculateSubtotalHT().toFixed(2)} €</span>
                        </div>
                        <div className="summary-row">
                            <span>TVA (20%)</span>
                            <span>{calculateTVA().toFixed(2)} €</span>
                        </div>
                        <div className="summary-row">
                            <span>Sous-total TTC</span>
                            <span>{getTotalPrice().toFixed(2)} €</span>
                        </div>
                        <div className="summary-row">
                            <span>Frais de livraison</span>
                            <span>6.49 €</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>{(getTotalPrice() + 6.49).toFixed(2)} €</span>
                        </div>
                    </div>
                </div>

                <div className="confirmation-actions">
                    <button 
                        onClick={handleReturnToShop} 
                        className="continue-shopping"
                    >
                        Retour à la boutique
                    </button>
                </div>
            </div>
        </div>
    );
} 