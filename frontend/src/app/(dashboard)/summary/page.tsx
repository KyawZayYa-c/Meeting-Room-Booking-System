'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Container,
    VStack,
    Box,
    Tabs,
    Card,
    HStack,
    Text
} from '@chakra-ui/react';
import { useAppSelector } from '@/lib/store/hooks';
import { useGetGroupedBookingsQuery, useGetUsageSummaryQuery } from '@/lib/features/summary/summaryApiSlice';
import SummaryHeader from './components/SummaryHeader';
import GroupedBookingsTab from './components/GroupedBookingsTab';
import UsageStatisticsTab from './components/UsageStatisticsTab';

export default function SummaryPage() {
    const router = useRouter();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const [activeTab, setActiveTab] = useState<'grouped' | 'usage'>('grouped');

    const {
        data: groupedData,
        isLoading: isLoadingGrouped,
    } = useGetGroupedBookingsQuery(undefined, { skip: !isAuthenticated });

    const {
        data: usageData,
        isLoading: isLoadingUsage,
    } = useGetUsageSummaryQuery(undefined, { skip: !isAuthenticated });

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
        if (user?.role !== 'admin' && user?.role !== 'owner') {
            router.push('/dashboard');
        }
    }, [isAuthenticated, user, router]);

    if (!user || (user.role !== 'admin' && user.role !== 'owner')) return null;

    const groupedBookings = groupedData?.data?.data || [];
    const usageSummary = usageData?.data?.data || null;
    const isLoading = isLoadingGrouped || isLoadingUsage;

    return (
        <Box bg="gray.50" minH="100vh" py={4}>
            <Container maxW="container.xl" px={{ base: 3, md: 6 }}>
                <VStack align="stretch" gap={6}>
                    {/* Header */}
                    <SummaryHeader userRole={user.role} />

                    {/* Tabs - Modern Design */}
                    <Card.Root
                        variant="outline"
                        borderColor="gray.200"
                        borderRadius="2xl"
                        shadow="sm"
                        bg="white"
                        overflow="hidden"
                    >
                        <Card.Body p={0}>
                            <Tabs.Root
                                value={activeTab}
                                onValueChange={(e) => setActiveTab(e.value as 'grouped' | 'usage')}
                            >
                                {/* Tab List with Modern Design */}
                                <Box
                                    px={{ base: 4, sm: 6 }}
                                    pt={{ base: 4, sm: 6 }}
                                    pb={0}
                                >
                                    <Tabs.List
                                        bg="transparent"
                                        borderRadius="xl"
                                        p={1.5}
                                        gap={1}
                                        position="relative"
                                        borderBottom="2px solid"
                                        borderColor="gray.100"
                                    >
                                        <Tabs.Trigger
                                            value="grouped"
                                            flex="1"
                                            borderRadius="lg"
                                            py={{ base: 2.5, sm: 3 }}
                                            px={4}
                                            fontSize={{ base: 'sm', sm: 'md' }}
                                            fontWeight="medium"
                                            bg="transparent"
                                            _selected={{
                                                bg: 'blue.50',
                                                color: 'blue.600',
                                                shadow: 'none',
                                            }}
                                            transition="all 0.3s"
                                        >
                                            <HStack gap={2} justify="center">
                                                <Text fontSize={{ base: 'lg', sm: 'xl' }}>👥</Text>
                                                <Text>Grouped by User</Text>
                                            </HStack>
                                        </Tabs.Trigger>
                                        <Tabs.Trigger
                                            value="usage"
                                            flex="1"
                                            borderRadius="lg"
                                            py={{ base: 2.5, sm: 3 }}
                                            px={4}
                                            fontSize={{ base: 'sm', sm: 'md' }}
                                            fontWeight="medium"
                                            bg="transparent"
                                            _selected={{
                                                bg: 'blue.50',
                                                color: 'blue.600',
                                                shadow: 'none',
                                            }}
                                            transition="all 0.3s"
                                        >
                                            <HStack gap={2} justify="center">
                                                <Text fontSize={{ base: 'lg', sm: 'xl' }}>📈</Text>
                                                <Text>Usage Statistics</Text>
                                            </HStack>
                                        </Tabs.Trigger>
                                    </Tabs.List>
                                </Box>

                                {/* Tab Contents */}
                                <Box px={{ base: 4, sm: 6 }} py={{ base: 4, sm: 6 }}>
                                    <Tabs.Content value="grouped">
                                        <GroupedBookingsTab
                                            groupedBookings={groupedBookings}
                                            isLoading={isLoadingGrouped}
                                        />
                                    </Tabs.Content>

                                    <Tabs.Content value="usage">
                                        <UsageStatisticsTab
                                            usageSummary={usageSummary}
                                            isLoading={isLoadingUsage}
                                        />
                                    </Tabs.Content>
                                </Box>
                            </Tabs.Root>
                        </Card.Body>
                    </Card.Root>
                </VStack>
            </Container>
        </Box>
    );
}