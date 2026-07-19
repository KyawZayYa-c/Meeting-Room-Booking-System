'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { Toaster } from '@/components/ui/toaster';
import Navbar from './components/Navbar';
import { Box, Spinner, Center } from '@chakra-ui/react';
import { useGetMeQuery } from '@/lib/features/auth/authApiSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { setUser } from '@/lib/store/slices/authSlice';
import {useEffect} from 'react';
import LoadingSpinner from "@/app/components/LoadingSpinner";

function AppContent({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const { data: userData, isLoading } = useGetMeQuery(undefined);

    useEffect(() => {
        if (userData?.user) {
            dispatch(setUser(userData.user));
        }
    }, [userData, dispatch]);

    if (isLoading) {
        return <LoadingSpinner />
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