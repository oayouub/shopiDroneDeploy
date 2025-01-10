'use client';

import React, { Suspense } from 'react';
import ProductList from '../components/ProductList/ProductList';
import { useSearchParams } from 'next/navigation';
import './fullList.scss';

const FullListContent = () => {
    const searchParams = useSearchParams();
    const category = searchParams?.get('category');
    const searchQuery = searchParams?.get('search');

    return (
        <div className='fullList'>
            <h1 className="title-1">
                {searchQuery 
                    ? `Résultats pour "${searchQuery}"`
                    : category 
                        ? `Produits - ${category}` 
                        : 'Tous les produits'
                }
            </h1>
            <ProductList category={category || ''} searchQuery={searchQuery || ''} />
        </div>
    );
};

const FullListPage = () => {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <FullListContent />
        </Suspense>
    );
};

export default FullListPage;