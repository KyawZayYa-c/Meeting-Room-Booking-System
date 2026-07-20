'use client';

import { Box, VStack, Text, Spinner } from '@chakra-ui/react';

interface LoadingSpinnerProps {
    fullScreen?: boolean;
}

export default function LoadingSpinner({
                                           fullScreen = false
                                       }: LoadingSpinnerProps) {
    const content = (
        <VStack gap={4} align="center">
            <Spinner size="xl" colorPalette="blue" />
        </VStack>
    );

    if (fullScreen) {
        return (
            <Box
                minH="100vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="gray.50"
            >
                {content}
            </Box>
        );
    }

    return (
        <Box py={20} display="flex" alignItems="center" justifyContent="center">
            {content}
        </Box>
    );
}