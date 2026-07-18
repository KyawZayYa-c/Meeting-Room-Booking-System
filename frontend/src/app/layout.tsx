'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { Toaster } from '@/components/ui/toaster';
import Navbar from './components/Navbar';
import { Box } from '@chakra-ui/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <Provider store={store}>
            <ChakraProvider value={defaultSystem}>
                <Toaster />
                <Navbar />
                <Box as="main" minH="calc(100vh - 64px)" bg="gray.50">
                    {children}
                </Box>
            </ChakraProvider>
        </Provider>
        </body>
        </html>
    );
}