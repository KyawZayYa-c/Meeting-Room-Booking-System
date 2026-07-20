'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/store/hooks';

export function withAuth(Component: React.ComponentType<any>, requiredRoles?: ('admin' | 'owner' | 'user')[]) {
    return function AuthenticatedComponent(props: any) {
        const router = useRouter();
        const { user, isAuthenticated } = useAppSelector((state) => state.auth);

        useEffect(() => {
            if (isAuthenticated && user && requiredRoles && requiredRoles.length > 0) {
                if (!user.role || !requiredRoles.includes(user.role)) {
                    router.push('/dashboard');
                }
            }
        }, [isAuthenticated, user, router, requiredRoles]);

        if (!isAuthenticated || !user) {
            return null;
        }

        return <Component {...props} />;
    };
}