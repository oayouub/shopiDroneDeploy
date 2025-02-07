import icoAdd from '../../public/svg/ico-add.svg'
import Image from "next/image";
import './sellpush.scss'

export default function SellPush() {
    return (
        <div className={'sell-push flex -align-center -justify-center'}>
            <div className="content flex -align-center -direction-column -justify-center">
                <div className="title-1">C'est le moment de vendre</div>
                    <a href="/sell" className="btn-ico btn -ico sell-btn">
                        <Image src={icoAdd} alt={''} width={24} height={24} className={'ico'}/>
                    Déposer une annonce
                </a>
            </div>
        </div>
    )
}