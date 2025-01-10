'use client';

import { useState, useContext, useEffect } from 'react';
import { useCart } from '@/app/context/CartContext';
import { AuthContext } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './checkout.scss';
import { FaCreditCard, FaPaypal, FaLock } from 'react-icons/fa';
import { SiKlarna } from 'react-icons/si';

// Images des transporteurs
import visa from '@/app/public/svg/visa.svg';
import mastercard from '@/app/public/svg/mastercard.svg';
import cb from '@/app/public/svg/cb.svg';
import safe from '@/app/public/svg/secure.svg';
import mondialRelay from '@/app/public/svg/mondialRelais.svg';
import colissimo from '@/app/public/images/colissimo.png';
import chronopost from '@/app/public/images/shop2shop.png';
import relais from '@/app/public/images/relais-colis.png';

interface ShippingMethod {
    id: string;
    name: string;
    price: number;
    delay: string;
    image: any;
}

const shippingMethods: ShippingMethod[] = [
    {
        id: 'mondial-relay',
        name: 'Mondial Relay',
        price: 6.49,
        delay: 'En point de retrait sous 3-5 jours',
        image: mondialRelay
    },
    {
        id: 'colissimo',
        name: 'Colissimo',
        price: 16.60,
        delay: 'à votre domicile sous 2-3 jours',
        image: colissimo
    },
    {
        id: 'chronopost',
        name: 'Shop2Shop ',
        price: 6.49,
        delay: 'En point de retrait sous 3-5 jours',
        image: chronopost
    },
    {
        id: 'relaisColis',
        name: 'Relais Colis ',
        price: 6.49,
        delay: 'En point de retrait sous 3-5 jours',
        image: relais
    }
];

export default function Checkout() {
    const { items, getTotalPrice } = useCart();
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedShipping, setSelectedShipping] = useState<string>('');
    const [shippingAddress, setShippingAddress] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'France'
    });
    const [selectedPayment, setSelectedPayment] = useState<string>('');

    useEffect(() => {
        if (!user) {
            router.push('/auth');
            return;
        }
        
        if (items.length === 0) {
            router.push('/cart');
            return;
        }
    }, [user, items, router]);

    // If not authenticated or no items, render nothing while redirecting
    if (!user || items.length === 0) {
        return null;
    }

    const handleShippingSelection = (methodId: string) => {
        setSelectedShipping(methodId);
    };

    const handleAddressSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentStep(3);
    };

    const getShippingPrice = () => {
        const method = shippingMethods.find(m => m.id === selectedShipping);
        return method?.price || 0;
    };

    const getFinalTotal = () => {
        return getTotalPrice() + getShippingPrice();
    };

    const handlePayment = () => {
        // Simulation de paiement
        alert('Paiement simulé - Commande validée !');
        router.push('/confirmation');
    };

    const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Ne garde que les chiffres et limite à 5 caractères
        const numbersOnly = value.replace(/[^0-9]/g, '').slice(0, 5);
        setShippingAddress({
            ...shippingAddress,
            postalCode: numbersOnly
        });
    };

    return (
        <div className="checkout-page">
            <div className="checkout-container">
                <div className="checkout-steps">
                    <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                        1. Livraison
                    </div>
                    <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                        2. Adresse
                    </div>
                    <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                        3. Paiement
                    </div>
                </div>

                <div className="checkout-content">
                    {currentStep === 1 && (
                        <div className="shipping-methods">
                            <h2>Choisissez votre mode de livraison</h2>
                            {shippingMethods.map((method) => (
                                <div 
                                    key={method.id}
                                    className={`shipping-method ${selectedShipping === method.id ? 'selected' : ''}`}
                                    onClick={() => handleShippingSelection(method.id)}
                                >
                                    <Image 
                                        src={method.image} 
                                        alt={method.name}
                                        width={45}
                                        height={45}
                                    />
                                    <div className="method-info">
                                        <h3>{method.name}</h3>
                                        <p>{method.delay}</p>
                                    </div>
                                    <div className="method-price">
                                        {method.price.toFixed(2)} €
                                    </div>
                                </div>
                            ))}
                            <button 
                                className="next-step"
                                disabled={!selectedShipping}
                                onClick={() => setCurrentStep(2)}
                            >
                                Continuer
                            </button>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <form className="shipping-address" onSubmit={handleAddressSubmit}>
                            <h2>Adresse de livraison</h2>
                            <div className="form-group">
                                <label>Nom complet</label>
                                <input
                                    type="text"
                                    value={shippingAddress.fullName}
                                    onChange={(e) => setShippingAddress({
                                        ...shippingAddress,
                                        fullName: e.target.value
                                    })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Adresse</label>
                                <input
                                    type="text"
                                    value={shippingAddress.address}
                                    onChange={(e) => setShippingAddress({
                                        ...shippingAddress,
                                        address: e.target.value
                                    })}
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Code postal</label>
                                    <input
                                        type="text"
                                        pattern="[0-9]*"
                                        inputMode="numeric"
                                        maxLength={5}
                                        value={shippingAddress.postalCode}
                                        onChange={handlePostalCodeChange}
                                        placeholder="75000"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Ville</label>
                                    <input
                                        type="text"
                                        value={shippingAddress.city}
                                        onChange={(e) => setShippingAddress({
                                            ...shippingAddress,
                                            city: e.target.value
                                        })}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="next-step">
                                Continuer vers le paiement
                            </button>
                        </form>
                    )}

                    {currentStep === 3 && (
                        <div className="payment-section">
                            <h2>Paiement sécurisé</h2>
                            <div className="payment-methods">
                                <div 
                                    className={`payment-method ${selectedPayment === 'card' ? 'selected' : ''}`}
                                    onClick={() => setSelectedPayment('card')}
                                >
                                    <div className="payment-method-header">
                                        <FaCreditCard size={24} />
                                        <h3>Carte bancaire</h3>
                                    </div>
                                    <div className="payment-logos">
                                        <Image src={visa} alt="Visa" width={40} height={25} />
                                        <Image src={mastercard} alt="Mastercard" width={40} height={25} />
                                        <Image src={cb} alt="CB" width={40} height={25} />
                                    </div>
                                </div>

                                <div 
                                    className={`payment-method ${selectedPayment === 'paypal' ? 'selected' : ''}`}
                                    onClick={() => setSelectedPayment('paypal')}
                                >
                                    <div className="payment-method-header">
                                        <FaPaypal size={24} />
                                        <h3>PayPal</h3>
                                    </div>
                                    <p>Paiement sécurisé via PayPal</p>
                                </div>

                                <div 
                                    className={`payment-method ${selectedPayment === 'klarna' ? 'selected' : ''}`}
                                    onClick={() => setSelectedPayment('klarna')}
                                >
                                    <div className="payment-method-header">
                                        <SiKlarna size={24} />
                                        <h3>Paiement en 3x sans frais</h3>
                                    </div>
                                    <p>Payez en 3 fois avec Klarna</p>
                                </div>
                            </div>

                            <button 
                                className="next-step"
                                disabled={!selectedPayment}
                                onClick={handlePayment}
                            >
                                Payer {getFinalTotal().toFixed(2)} €
                            </button>

                            <div className="payment-security">
                                <div className="security-info">
                                    <FaLock size={20} />
                                    <span>Paiement 100% sécurisé</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="checkout-summary">
                    <h2>Récapitulatif</h2>
                    <div className="summary-items">
                        {items.map((item) => (
                            <div key={item.id} className="summary-item">
                                <span>{item.nom} × {item.quantity}</span>
                                <span>{(item.prix * 1.2 * item.quantity).toFixed(2)} €</span>
                            </div>
                        ))}
                    </div>
                    <div className="summary-total">
                        <div className="summary-row">
                            <span>Sous-total TTC</span>
                            <span>{getTotalPrice().toFixed(2)} €</span>
                        </div>
                        <div className="summary-row">
                            <span>Livraison</span>
                            <span>{getShippingPrice().toFixed(2)} €</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>{getFinalTotal().toFixed(2)} €</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 