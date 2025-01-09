'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import './Card.scss'

interface CardProps {
    img: string
    name: string
    price: number
    description: string
    id: number 
}

const Card: React.FC<CardProps> = ({ name, price, description, img, id }) => {
    const router = useRouter()

    const handleCardClick = () => {
        router.push(`/product/${id}`) 
    }

    return (
        <div className='card' onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <div className='card-image'>
                <img src={img} alt={name} />
            </div>
            <div className='card-text'>
                <div className='card-info'>
                    <h2>{name}</h2>
                    <p><strong>${price}</strong></p>
                </div>
                <p className='description'>{description}</p>
            </div>
        </div>
    )
}

export default Card
