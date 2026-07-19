'use client';

import { useState } from 'react';
import { Box, VStack, Text, Button, Card, Icon } from '@chakra-ui/react';
import { FiAlertCircle, FiRefreshCw, FiArrowLeft } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

interface ErrorDisplayProps {
    title?: string;
    message?: string;
    showBack?: boolean;
    showRetry?: boolean;
    onRetry?: () => void;
    fullScreen?: boolean;
    statusCode?: number;
}

export default function ErrorDisplay({
                                         title = 'Something went wrong',
                                         message = 'An unexpected error occurred. Please try again.',
                                         showBack = true,
                                         showRetry = true,
                                         onRetry,
                                         fullScreen = false,
                                         statusCode,
                                     }: ErrorDisplayProps) {
    const router = useRouter();
    const [isRetrying, setIsRetrying] = useState(false);

    const handleRetry = async () => {
        if (!onRetry) return;

        setIsRetrying(true);
        try {
            await onRetry();
        } finally {
            setIsRetrying(false);
        }
    };

    const content = (
        <Card.Root
            variant="outline"
            borderColor="gray.200"
            borderRadius="2xl"
            borderStyle="dashed"
            borderWidth="2px"
            bg="gray.50"
            maxW="md"
            mx="auto"
        >
            <Card.Body py={16} textAlign="center">
                <VStack gap={4}>
                    <Box
                        bg="red.50"
                        borderRadius="full"
                        p={4}
                        display="inline-block"
                    >
                        <Icon as={FiAlertCircle} boxSize={10} color="red.500" />
                    </Box>

                    {statusCode && (
                        <Text fontSize="sm" color="gray.400" fontWeight="bold">
                            Error {statusCode}
                        </Text>
                    )}

                    <Text fontSize="lg" fontWeight="semibold" color="gray.700">
                        {title}
                    </Text>

                    <Text fontSize="sm" color="gray.500" maxW="sm">
                        {message}
                    </Text>

                    <VStack gap={2} width="full" mt={2}>
                        {showRetry && onRetry && (
                            <Button
                                colorPalette="blue"
                                onClick={handleRetry}
                                borderRadius="xl"
                                width="full"
                                maxW="200px"
                                loading={isRetrying}
                                loadingText="Retrying..."
                                _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
                                transition="all 0.2s"
                            >
                                <Icon as={FiRefreshCw} mr={2} />
                                Try Again
                            </Button>
                        )}

                        {showBack && (
                            <Button
                                variant="outline"
                                colorPalette="gray"
                                onClick={() => router.back()}
                                borderRadius="xl"
                                width="full"
                                maxW="200px"
                                _hover={{ bg: 'gray.100' }}
                                transition="all 0.2s"
                            >
                                <Icon as={FiArrowLeft} mr={2} />
                                Go Back
                            </Button>
                        )}
                    </VStack>
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
        <Box py={8}>
            {content}
        </Box>
    );
}