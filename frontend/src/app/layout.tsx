'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { Toaster } from '@/components/ui/toaster';
import Navbar from './components/Navbar';
import { Box} from '@chakra-ui/react';
import { useGetMeQuery } from '@/lib/features/auth/authApiSlice';
import {useAppDispatch, useAppSelector} from '@/lib/store/hooks';
import { setUser } from '@/lib/store/slices/authSlice';
import {useEffect} from 'react';
import LoadingSpinner from "@/app/components/LoadingSpinner";
import {usePathname, useRouter} from "next/navigation";

function AppContent({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const pathname = usePathname();

    const { data: userData, isLoading } = useGetMeQuery(undefined);
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (userData?.user) {
            dispatch(setUser(userData.user));
        }
    }, [userData, dispatch]);

    useEffect(() => {
                if (!isLoading && !userData?.user && pathname !== '/login' && pathname !== '/') {
            router.push(`/login?redirectTo=${encodeURIComponent(pathname)}`);
        }
    }, [isLoading, userData, pathname, router]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!isAuthenticated && !userData?.user && pathname !== '/login' && pathname !== '/') {
        return <LoadingSpinner />;
    }


    return (
        <>
            <Navbar />
            <Box as="main" minH="calc(100vh - 64px)" bg="gray.50">
                {children}
            </Box>
        </>
    );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <Provider store={store}>
            <ChakraProvider value={defaultSystem}>
                <Toaster />
                <AppContent>{children}</AppContent>
            </ChakraProvider>
        </Provider>
        </body>
        </html>
    );
}