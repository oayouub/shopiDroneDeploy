// /app/components/Providers/ClientProvider.tsx

'use client';

import { AuthProvider } from '@/app/context/AuthContext';
import { CartProvider } from '@/app/context/CartContext';

export default function ClientProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </AuthProvider>
    );
}
