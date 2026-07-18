'use client';

import { Card, VStack, Text, Spinner } from '@chakra-ui/react';

export default function BookingsLoading() {
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
                    <Text color="gray.500" fontWeight="medium">Loading bookings...</Text>
                    <Text fontSize="sm" color="gray.400">Please wait a moment</Text>
                </VStack>
            </Card.Body>
        </Card.Root>
    );
}