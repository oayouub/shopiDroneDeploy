import Image from "next/image";
import banner from './public/images/banner.jpg'
import ProductSelection from "./components/ProductSelection/ProductSelection";
import SellPush from "@/app/components/SellPush/SellPush";
import Trustpilot from "@/app/components/Trustpilot/Trustpilot";
import PictureMenu from "./components/PictureMenu/PictureMenu";

export default function Home() {
    return (
        <div className="page-home">
            <div className="banner-wrapper">
                <div className="banner-container">
                <Image src={banner} alt={''} className={'banner'} width={1440} height={768}/>
                </div>
                <div className="wrapper -medium -padded sign-wrapper">
                    <div className="sign flex -direction-column">
                        <p className={'title-1'}>Faites de la place, vendez vos drones et pièces facilement !</p>
                        <a href="/sell" className="btn sell-btn">Vends maintenant</a>
                        <a href="/about" className="link">Découvrir qui est ShopiDrone</a>
                    </div>
                </div>
            </div>
            <div className="content">
                <PictureMenu/>
                <ProductSelection maxArticles={15}/>
                <SellPush/>
                <ProductSelection maxArticles={10}/>
                <Trustpilot/>
            </div>
        </div>
    )
}