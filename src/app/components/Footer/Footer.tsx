import Image from "next/image";
import icoLinkedIn from '../../public/svg/ico-linkedin.svg'
import icoTwitter from '../../public/svg/ico-twitter.svg'
import icoInsta from '../../public/svg/ico-insta.svg'

export default function Footer()
{
    const currentYear = new Date().getFullYear();

    return (
        <div className={'footer'}>
            <div className="wrapper -large -padded">
                <div className="grid -three">
                    <div className="col -one -auto">
                        <div className="title-3">À propos de shopidrone</div>
                        <div className="link-container flex -direction-column">
                            <a href="#who" className="item">Qui sommes-nous ?</a>
                        </div>
                    </div>
                    <div className="col -one -auto">
                        <div className="title-3">Informations légales</div>
                        <div className="link-container flex -direction-column">
                            <a href="#who" className="item">Conditions générales d’utilisation</a>
                            <a href="#who" className="item">Conditions générales de vente</a>
                            <a href="#who" className="item">Vie privée / cookies</a>
                            <a href="#who" className="item">Accessibilité</a>
                        </div>
                    </div>
                    <div className="col -one -auto">
                        <div className="title-3">Des questions ?</div>
                        <div className="link-container flex -direction-column">
                            <a href="#who" className="item">Aide</a>
                            <a href="#who" className="item">Le paiement sécurisé et la livraison</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom flex -justify-space-between -align-center">
                    <div className="title-3">©ShopiDrone {currentYear}</div>
                    <div className="title-3 flex -align-center rs">Retrouvez-nous sur
                        <a href="https://linkedin.com/" target={'blank'} rel={'nofollow'} className="ico">
                            <Image src={icoLinkedIn} alt={''}/>
                        </a>
                        <a href="https://x.com/" target={'blank'} rel={'nofollow'} className="ico">
                            <Image src={icoTwitter} alt={''}/>
                        </a>
                        <a href="https://instagram.com/" target={'blank'} rel={'nofollow'} className="ico">
                            <Image src={icoInsta} alt={''}/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}