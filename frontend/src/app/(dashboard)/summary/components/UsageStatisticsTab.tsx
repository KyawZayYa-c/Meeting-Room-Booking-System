'use client';

import { VStack, Box, Text, Spinner, SimpleGrid, Card } from '@chakra-ui/react';
import { FiUsers, FiBookOpen, FiUser } from 'react-icons/fi';
import StatsCard from './StatsCard';
import UserStatsTable from './UserStatsTable';

interface UsageStatisticsTabProps {
    usageSummary: any;
    isLoading: boolean;
}

export default function UsageStatisticsTab({ usageSummary, isLoading }: UsageStatisticsTabProps) {
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
                        <Text color="gray.500" fontWeight="medium">Loading usage statistics...</Text>
                        <Text fontSize="sm" color="gray.400">Please wait a moment</Text>
                    </VStack>
                </Card.Body>
            </Card.Root>
        );
    }

    if (!usageSummary) {
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
                    <Box fontSize="5xl" mb={4}>📊</Box>
                    <Text fontSize="lg" fontWeight="semibold" color="gray.600">
                        No usage data available
                    </Text>
                    <Text fontSize="sm" color="gray.400" mt={1}>
                        Start creating bookings to see statistics
                    </Text>
                </Card.Body>
            </Card.Root>
        );
    }

    const perUser = usageSummary.perUser || [];
    const maxBookings = perUser.length > 0 ? Math.max(...perUser.map((u: any) => u.count)) : 1;

    // Stats data for mapping
    const statsData = [
        {
            label: 'Total Bookings',
            value: usageSummary.totalBookings,
            color: 'blue.600',
            icon: FiBookOpen,
            iconBg: 'blue.50',
            iconColor: 'blue.500',
        },
        {
            label: 'Total Users',
            value: usageSummary.totalUsers,
            color: 'green.600',
            icon: FiUsers,
            iconBg: 'green.50',
            iconColor: 'green.500',
        },
        ...(usageSummary.roleCounts || []).map((role: any) => ({
            label: `${role._id}s`,
            value: role.count,
            color: role._id === 'admin' ? 'red.600' : role._id === 'owner' ? 'purple.600' : 'blue.600',
            icon: FiUser,
            iconBg: role._id === 'admin' ? 'red.50' : role._id === 'owner' ? 'purple.50' : 'blue.50',
            iconColor: role._id === 'admin' ? 'red.500' : role._id === 'owner' ? 'purple.500' : 'blue.500',
        })),
    ];

    return (
        <VStack align="stretch" gap={6}>
            {/* Stats Cards - Using map loop */}
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4}>
                {statsData.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                ))}
            </SimpleGrid>

            {/* Per User Stats Table */}
            <UserStatsTable perUser={perUser} maxBookings={maxBookings} />
        </VStack>
    );
}