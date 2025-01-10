'use client'

import React from 'react';
import './about.scss'

const About = () => {
    return (
        <div className="about-page">
            <div className="about-hero">
                <h1>À propos de Shopidrone</h1>
                <p className="subtitle">La communauté des passionnés de drones</p>
            </div>

            <div className="about-content">
                <section className="mission-section">
                    <h2>Notre Mission</h2>
                    <p>
                        Shopidrone est né d'une vision simple mais ambitieuse : créer un espace unique 
                        qui rassemble tous les passionnés de drones. Notre plateforme a été conçue pour 
                        devenir la plaque tournante incontournable de l'univers des drones en France.
                    </p>
                </section>

                <section className="stats-section">
                    <div className="stat-card">
                        <div className="stat-number">5000+</div>
                        <div className="stat-label">Membres actifs</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">10000+</div>
                        <div className="stat-label">Annonces publiées</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">98%</div>
                        <div className="stat-label">Utilisateurs satisfaits</div>
                    </div>
                </section>

                <section className="vision-section">
                    <div className="vision-card">
                        <h3>Une Communauté Unie</h3>
                        <p>
                            Fini le temps où il fallait naviguer entre différentes plateformes et groupes 
                            de discussion. Shopidrone rassemble tout ce dont vous avez besoin en un seul endroit.
                        </p>
                    </div>

                    <div className="vision-card">
                        <h3>Échange et Partage</h3>
                        <p>
                            Notre plateforme facilite les échanges entre passionnés, que ce soit pour 
                            vendre du matériel, partager des conseils ou discuter des dernières innovations.
                        </p>
                    </div>

                    <div className="vision-card">
                        <h3>Innovation Continue</h3>
                        <p>
                            Nous développons constamment de nouvelles fonctionnalités pour améliorer 
                            votre expérience et renforcer les liens au sein de la communauté.
                        </p>
                    </div>
                </section>

                <section className="team-section">
                    <h2>Notre Engagement</h2>
                    <p>
                        Chez Shopidrone, nous nous engageons à maintenir les plus hauts standards de qualité et de sécurité. 
                        Chaque transaction est sécurisée, et notre équipe de modération travaille en permanence pour assurer 
                        une expérience optimale à tous nos utilisateurs.
                    </p>
                    <p>
                        Notre plateforme est constamment mise à jour pour intégrer les dernières innovations technologiques 
                        et répondre aux besoins évolutifs de notre communauté. Nous sommes à l'écoute de vos retours et 
                        suggestions pour améliorer continuellement nos services.
                    </p>
                </section>

                <section className="future-section">
                    <h2>Notre Vision pour l'Avenir</h2>
                    <p>
                        Shopidrone aspire à devenir bien plus qu'une simple plateforme de vente. 
                        Nous souhaitons créer un écosystème complet où les pilotes de drones peuvent :
                    </p>
                    <ul>
                        <li>Échanger leurs expériences et expertise</li>
                        <li>Acheter et vendre du matériel en toute confiance</li>
                        <li>Rester informés des dernières actualités du monde du drone</li>
                        <li>Participer à une communauté dynamique et passionnée</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default About;
