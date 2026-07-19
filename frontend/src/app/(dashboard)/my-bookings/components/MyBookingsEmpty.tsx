'use client';

import { Box, VStack, Text, Button, Card } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function MyBookingsEmpty() {
    const router = useRouter();

    return (
        <Card.Root
            variant="outline"
            borderColor="gray.200"
            borderRadius="2xl"
            borderStyle="dashed"
            borderWidth="2px"
            bg="gray.50"
        >
            <Card.Body py={16} textAlign="center">
                <VStack gap={4}>
                    <Box fontSize="5xl">📭</Box>
                    <Text fontSize="lg" fontWeight="semibold" color="gray.600">
                        No bookings yet
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                        You haven't created any bookings yet
                    </Text>
                    <Button
                        colorPalette="blue"
                        onClick={() => router.push('/bookings/new')}
                        borderRadius="xl"
                        mt={2}
                        _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
                        transition="all 0.2s"
                    >
                        Create Your First Booking
                    </Button>
                </VStack>
            </Card.Body>
        </Card.Root>
    );
}