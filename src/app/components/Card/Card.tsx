'use client'
import React from 'react'
import {useRouter} from 'next/navigation'

interface CardProps {
    img: string
    name: string
    price: number
    description: string
    id: number
    categorie: string
    stock: number
}

const Card: React.FC<CardProps> = ({name, price, description, categorie, img, stock, id}) => {
    const router = useRouter()

    const handleCardClick = () => {
        router.push(`/product/${id}`)
    }

    const priceWithTax = price * 1.2;

    const truncateTitle = (title: string, maxLength: number = 25) => {
        if (title.length > maxLength) {
            return title.substring(0, maxLength) + '...';
        }
        return title;
    };

    return (
        <div className='card' onClick={handleCardClick}>
            <div className='card-image'>
                <img src={img} alt={name}/>
            </div>
            <div className='card-text'>
                <div className={'title-3'}>{truncateTitle(name)}</div>
                <div className="category">{categorie}</div>
                <div className="flex">
                    <div className="price-block">
                        <div className={'body price'}>{price} €</div>
                        <div className="tva">{priceWithTax.toFixed(2)} € <span className="small">incl. tva</span></div>
                    </div>
                    <div className="stock">Stock : {stock}</div>
                </div>
            </div>
        </div>
    )
}

export default Card
