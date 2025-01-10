import Link from 'next/link';
import Image from 'next/image';
import './footer.scss';
import alma from '@/app/public/images/alma.png';
import truck from '@/app/public/images/truck.png';
import france from '@/app/public/images/france.png';
import support from '@/app/public/images/support.png';

const Footer = () => {
    return (
        <footer className="footer">
            {/* Bande bleue avec les services */}
            <div className="services-banner">
                <div className="container">
                    <div className="services-grid">
                        <div className="service-item">
                            <div className="text">
                                <Image src={truck} alt="Livraison" />
                                <h4>LIVRAISON RAPIDE</h4>
                                <p>partout en France</p>
                            </div>
                        </div>
                        <div className="service-item">
                            <div className="text">
                                <Image src={france} alt="France" />
                                <h4>VENDEURS VÉRIFIÉS</h4>
                                <p>100% authentique</p>
                            </div>
                        </div>
                        <div className="service-item">
                            <div className="text">
                                <Image src={support} alt="Support" />
                                <h4>SUPPORT RÉACTIF</h4>
                                <p>7j/7 de 9h à 19h</p>
                            </div>
                        </div>
                        <div className="service-item">
                            <div className="text">
                                <Image src={alma} alt="Paiement" />
                                <h4>PAIEMENT SÉCURISÉ</h4>
                                <p>en 3, 4 ou 10 fois</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenu principal du footer */}
            <div className="footer-content">
                <div className="container">

                    {/* Liens du footer */}
                    <div className="footer-links">
                        <div className="col">
                            <h3 className="title-3">À PROPOS DE SHOPYDRONE</h3>
                            <div className="link-container">
                                <Link href="#">Qui sommes-nous ?</Link>
                                <Link href="#">Devenir vendeur</Link>
                                <Link href="#">Notre engagement qualité</Link>
                                <Link href="#">Blog drones</Link>
                                <Link href="#">Espace presse</Link>
                            </div>
                        </div>

                        <div className="col">
                            <h3 className="title-3">INFORMATIONS LÉGALES</h3>
                            <div className="link-container">
                                <Link href="#">Conditions générales d'utilisation</Link>
                                <Link href="#">Protection des données</Link>
                                <Link href="#">Règles de publication</Link>
                                <Link href="#">Mentions légales</Link>
                                <Link href="#">Charte de bonne conduite</Link>
                                <Link href="#">Paiement sécurisé</Link>
                                <Link href="#">Accessibilité</Link>
                            </div>
                        </div>

                        <div className="col">
                            <h3 className="title-3">VENDRE ET ACHETER</h3>
                            <div className="link-container">
                                <Link href="#">Comment vendre</Link>
                                <Link href="#">Comment acheter</Link>
                                <Link href="#">Guide des prix</Link>
                                <Link href="#">Conseils sécurité</Link>
                                <Link href="#">Programme partenaires</Link>
                                <Link href="#">Annuaire des vendeurs</Link>
                            </div>
                        </div>

                        <div className="col">
                            <h3 className="title-3">AIDE & CONTACT</h3>
                            <div className="link-container">
                                <Link href="#">Centre d'aide</Link>
                                <Link href="#">Sécurité des transactions</Link>
                                <Link href="#">Protection acheteur</Link>
                                <Link href="#">Signaler un problème</Link>
                                <Link href="#">Contact support</Link>
                            </div>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className="footer-bottom">
                        <p>©ShopyDrone 2024 - 2025</p>
                        <div className="community-message">
                            <p>La communauté des dronistes 🚁</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;