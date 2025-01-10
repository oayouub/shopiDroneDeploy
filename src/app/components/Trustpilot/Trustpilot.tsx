'use client';

import { useState, useRef, useEffect } from 'react';
import icoStar from '../../public/svg/trustpilot-star.svg';
import trustpilotLogo from '../../public/images/trustpilot-logo.png';
import Image from 'next/image'
import './trustpilot.scss'

const reviews = [
    {
        title: "Livraison très rapide et prix correct",
        text: "Livraison très rapide et prix correct",
        author: "Xavier H-G",
        time: "Il y a 18 heures"
    },
    {
        title: "Service client excellent",
        text: "Réponse rapide et professionnelle. Je recommande vivement !",
        author: "Marie L.",
        time: "Il y a 2 jours"
    },
    {
        title: "Transaction parfaite",
        text: "Tout s'est très bien passé, je suis très satisfait de mon achat.",
        author: "Thomas B.",
        time: "Il y a 3 jours"
    },
    {
        title: "Très fiable",
        text: "Site sérieux et fiable. Deuxième commande et toujours aussi satisfait.",
        author: "Sophie M.",
        time: "Il y a 4 jours"
    },
    {
        title: "Excellent service",
        text: "Prix compétitifs et livraison ultra rapide. Parfait !",
        author: "Pierre D.",
        time: "Il y a 5 jours"
    },
    {
        title: "Je recommande",
        text: "Très bonne expérience, je n'hésiterai pas à recommander.",
        author: "Julie R.",
        time: "Il y a 1 semaine"
    }
];

const Trustpilot = () => {
    const reviewsRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const checkScrollButtons = () => {
        if (reviewsRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = reviewsRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10); // -10 pour la marge d'erreur
        }
    };

    useEffect(() => {
        checkScrollButtons();
        const element = reviewsRef.current;
        if (element) {
            element.addEventListener('scroll', checkScrollButtons);
            window.addEventListener('resize', checkScrollButtons);
        }
        return () => {
            if (element) {
                element.removeEventListener('scroll', checkScrollButtons);
                window.removeEventListener('resize', checkScrollButtons);
            }
        };
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (reviewsRef.current) {
            const container = reviewsRef.current;
            const cardWidth = 300; // Largeur d'une carte
            const gap = 20; // Espace entre les cartes
            const visibleCards = Math.floor(container.clientWidth / (cardWidth + gap));
            const scrollAmount = (cardWidth + gap) * Math.max(1, Math.floor(visibleCards / 2));

            const targetScroll = direction === 'left'
                ? container.scrollLeft - scrollAmount
                : container.scrollLeft + scrollAmount;

            container.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="trustpilot-container">
            <div className="section-title">
                <span className="title-text">★ Avis clients ★</span>
            </div>
            
            <div className="reviews-wrapper">
                {showLeftArrow && (
                    <button 
                        className="scroll-button left" 
                        onClick={() => scroll('left')}
                        aria-label="Voir les avis précédents"
                    >
                        ←
                    </button>
                )}
                
                <div 
                    className="trustpilot-reviews" 
                    ref={reviewsRef}
                >
                    {reviews.map((review, index) => (
                        <div className="review-card" key={index}>
                            <div className="stars">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <div key={star} className="star">
                                        <Image 
                                            src={icoStar} 
                                            alt="étoile" 
                                            width={20} 
                                            height={20}
                                            className="ico" 
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="verified">✓ Vérifié</div>
                            <p className="review-title">{review.title}</p>
                            <p className="review-text">{review.text}</p>
                            <div className="review-author">
                                <span className="name">{review.author},</span>
                                <span className="time">{review.time}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {showRightArrow && (
                    <button 
                        className="scroll-button right" 
                        onClick={() => scroll('right')}
                        aria-label="Voir les avis suivants"
                    >
                        →
                    </button>
                )}
            </div>
            
            <div className="trustpilot-summary">
                <div className="summary-text">
                    <span>Nos clients témoignent</span>
                    <span className="rating">Excellent</span>
                </div>
                <div className="stars">
                    {[1, 2, 3, 4].map((star) => (
                        <div key={star} className="star">
                            <Image 
                                src={icoStar} 
                                alt="étoile" 
                                width={20} 
                                height={20}
                                className="ico" 
                            />
                        </div>
                    ))}
                    <div className="star -half">
                        <Image 
                            src={icoStar} 
                            alt="étoile" 
                            width={20} 
                            height={20}
                            className="ico" 
                        />
                    </div>
                </div>
                <div className="rating-text">4.7 sur 5 basé sur 43 124 avis</div>
                <Image 
                    src={trustpilotLogo} 
                    alt="Trustpilot" 
                    width={80} 
                    height={20}
                />
            </div>
        </div>
    )
}

export default Trustpilot