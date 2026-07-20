import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/store/hooks';

export function useAuth(requiredRoles?: ('admin' | 'owner' | 'user')[]) {
    const router = useRouter();
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);

    useEffect(() => {
        // user === null && isAuthenticated === false → loading
        if (user === null && isAuthenticated === false) {
            return;
        }

        if (isAuthenticated && user) {
            const path = window.location.pathname;
            if (path === '/login' ) {
                router.push('/dashboard');
                return;
            }
        }

        if (!isAuthenticated && !user) {
            router.push('/login');
            return;
        }

        if (requiredRoles && requiredRoles.length > 0 && user?.role) {
            if (!requiredRoles.includes(user.role)) {
                router.push('/dashboard');
                return;
            }
        }
    }, [isAuthenticated, user, router, requiredRoles]);

    return { user, isAuthenticated };
}