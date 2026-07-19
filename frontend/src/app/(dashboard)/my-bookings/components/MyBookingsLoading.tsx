'use client';

import { Box, VStack, Text, Spinner, Card } from '@chakra-ui/react';

export default function MyBookingsLoading() {
    return (
        <Card.Root
            variant="outline"
            borderColor="gray.200"
            borderRadius="2xl"
            shadow="sm"
            bg="white"
        >
            <Card.Body py={20}>
                <VStack gap={4}>
                    <Spinner size="xl" colorPalette="blue" />
                    <Text color="gray.500" fontWeight="medium">Loading your bookings...</Text>
                    <Text fontSize="sm" color="gray.400">Please wait a moment</Text>
                </VStack>
            </Card.Body>
        </Card.Root>
    );
}