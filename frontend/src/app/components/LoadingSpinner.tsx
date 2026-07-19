// components/LoadingSpinner.tsx

'use client';

import { Box, VStack, Text, Spinner, Card } from '@chakra-ui/react';

interface LoadingSpinnerProps {
    message?: string;
    subMessage?: string;
    fullScreen?: boolean;
}

export default function LoadingSpinner({
                                           message = 'Loading...',
                                           subMessage = 'Please wait a moment',
                                           fullScreen = false
                                       }: LoadingSpinnerProps) {
    const content = (
        <Card.Root
            variant="outline"
            borderColor="gray.200"
            borderRadius="2xl"
            shadow="sm"
            bg="white"
            maxW="md"
            mx="auto"
        >
            <Card.Body py={20}>
                <VStack gap={4}>
                    <Spinner size="xl" colorPalette="blue" />
                    <Text color="gray.500" fontWeight="medium">
                        {message}
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                        {subMessage}
                    </Text>
                </VStack>
            </Card.Body>
        </Card.Root>
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
        <Box py={20}>
            {content}
        </Box>
    );
}