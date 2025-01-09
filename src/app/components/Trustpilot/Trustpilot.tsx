import icoStar from '../../public/svg/trustpilot-star.svg';
import trustpilotLogo from '../../public/images/trustpilot-logo.png';
import Image from "next/image";

export default function Trustpilot() {
    const elements = Array.from({length: 4}, (_, index) => index);

    return (
        <div className={'trustpilot flex -justify-center -align-center'}>
            <div className="body">Nos client témoignent</div>
            <div className="title-1">Excellent</div>
            <div className="note flex">
                {elements.map((element) => (
                    <div className={'star'} key={element}>
                        <Image src={icoStar} alt={''} width={21} height={20} className={'ico'}/>
                    </div>
                ))}
                <div className={'star -half'}>
                    <Image src={icoStar} alt={''} width={21} height={20} className={'ico'}/>
                </div>
            </div>
            <div className="body">4.7 sur 5 basé sur 43 124 avis</div>
            <Image src={trustpilotLogo} alt={''} width={106} height={26} className={'logo'}/>
        </div>
    )
}