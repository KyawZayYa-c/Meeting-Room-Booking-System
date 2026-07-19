'use client';

import { Box, HStack, Heading, Text, Button, Icon } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';

export default function MyBookingsHeader() {
    const router = useRouter();

    return (
        <HStack justify="space-between" flexWrap="wrap" gap={4}>
            <HStack gap={3}>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.back()}
                    borderRadius="full"
                    colorPalette="gray"
                    bg="gray.100"
                    _hover={{ bg: 'gray.200', transform: 'scale(0.95)' }}
                    transition="all 0.2s"
                >
                    <Icon as={FiArrowLeft} mr={1} />
                    Back
                </Button>
                <Box>
                    <HStack gap={2}>
                        <Heading size="lg" color="gray.800" fontWeight="bold">
                            📋 My Bookings
                        </Heading>
                    </HStack>
                    <Text fontSize="sm" color="gray.500" ml={1}>
                        View all your bookings
                    </Text>
                </Box>
            </HStack>
            <Button
                colorPalette="blue"
                onClick={() => router.push('/bookings/new')}
                size="lg"
                borderRadius="xl"
                shadow="md"
                _hover={{
                    transform: 'translateY(-2px)',
                    shadow: 'lg',
                    bg: 'blue.600'
                }}
                transition="all 0.2s"
            >
                <Icon as={FiPlus} mr={2} />
                New Booking
            </Button>
        </HStack>
    );
}