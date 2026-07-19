'use client';

import { Box, VStack, Text, Button, Card, Icon } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';

interface EmptyStateProps {
    icon?: string;
    title?: string;
    message?: string;
    buttonText?: string;
    onButtonClick?: () => void;
    fullScreen?: boolean;
}

export default function EmptyState({
                                       icon = '📭',
                                       title = 'No data found',
                                       message = 'There is no data to display at the moment.',
                                       buttonText,
                                       onButtonClick,
                                       fullScreen = false,
                                   }: EmptyStateProps) {
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
                    <Text fontSize="5xl">{icon}</Text>

                    <Text fontSize="lg" fontWeight="semibold" color="gray.700">
                        {title}
                    </Text>

                    <Text fontSize="sm" color="gray.500">
                        {message}
                    </Text>

                    {buttonText && onButtonClick && (
                        <Button
                            colorPalette="blue"
                            onClick={onButtonClick}
                            borderRadius="xl"
                            mt={2}
                            _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
                            transition="all 0.2s"
                        >
                            <Icon as={FiPlus} mr={2} />
                            {buttonText}
                        </Button>
                    )}
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