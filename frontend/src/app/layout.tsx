'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { Toaster } from '@/components/ui/toaster';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <Provider store={store}>
            <ChakraProvider value={defaultSystem}>
                <Toaster />
                {children}
            </ChakraProvider>
        </Provider>
        </body>
        </html>
    );
}