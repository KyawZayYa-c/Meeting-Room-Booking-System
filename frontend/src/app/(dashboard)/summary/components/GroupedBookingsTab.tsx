'use client';

import { VStack, Box, Text, Spinner, Card } from '@chakra-ui/react';
import GroupedBookingCard from './GroupedBookingCard';
import GroupedBookingsTable from './GroupedBookingsTable';

interface GroupedBookingsTabProps {
    groupedBookings: any[];
    isLoading: boolean;
}

export default function GroupedBookingsTab({ groupedBookings, isLoading }: GroupedBookingsTabProps) {
    if (isLoading) {
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
                        <Text color="gray.500" fontWeight="medium">Loading grouped bookings...</Text>
                        <Text fontSize="sm" color="gray.400">Please wait a moment</Text>
                    </VStack>
                </Card.Body>
            </Card.Root>
        );
    }

    if (groupedBookings.length === 0) {
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
                    <Box fontSize="5xl" mb={4}>📭</Box>
                    <Text fontSize="lg" fontWeight="semibold" color="gray.600">
                        No bookings found
                    </Text>
                    <Text fontSize="sm" color="gray.400" mt={1}>
                        No bookings have been created yet
                    </Text>
                </Card.Body>
            </Card.Root>
        );
    }

    return (
        <VStack align="stretch" gap={6}>
            {groupedBookings.map((group) => (
                <Card.Root
                    key={group.userId}
                    variant="outline"
                    borderColor="gray.200"
                    borderRadius="2xl"
                    shadow="sm"
                    bg="white"
                    overflow="hidden"
                >
                    <Card.Body p={0}>
                        {/* User Header */}
                        <GroupedBookingCard group={group} />

                        {/* Bookings Table */}
                        <GroupedBookingsTable bookings={group.bookings} />
                    </Card.Body>
                </Card.Root>
            ))}
        </VStack>
    );
}