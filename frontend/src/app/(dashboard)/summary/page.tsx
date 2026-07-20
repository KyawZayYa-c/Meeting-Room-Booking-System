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
    Text,
} from '@chakra-ui/react';
import { useAppSelector } from '@/lib/store/hooks';
import { useGetMeQuery } from '@/lib/features/auth/authApiSlice';
import { useGetGroupedBookingsQuery, useGetUsageSummaryQuery } from '@/lib/features/summary/summaryApiSlice';
import SummaryHeader from './components/SummaryHeader';
import GroupedBookingsTab from './components/GroupedBookingsTab';
import UsageStatisticsTab from './components/UsageStatisticsTab';
import { setUser } from '@/lib/store/slices/authSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ErrorDisplay from "@/app/components/ErrorDisplay";
import { withAuth } from "@/lib/hooks/withAuth";

function SummaryPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const [activeTab, setActiveTab] = useState<'grouped' | 'usage'>('grouped');

    const { data: userData, isLoading: isLoadingUser, error: userError } = useGetMeQuery(undefined, {
        skip: !isAuthenticated,
    });

    const {
        data: groupedData,
        isLoading: isLoadingGrouped,
        error: groupedError,
        refetch: refetchGrouped,
    } = useGetGroupedBookingsQuery(undefined, {
        skip: !isAuthenticated,
    });

    const {
        data: usageData,
        isLoading: isLoadingUsage,
        error: usageError,
        refetch: refetchUsage,
    } = useGetUsageSummaryQuery(undefined, {
        skip: !isAuthenticated,
    });

    useEffect(() => {
        if (userData?.user) {
            dispatch(setUser(userData.user));
        }
    }, [userData, dispatch]);

    const hasError = groupedError || usageError || userError;
    const isLoading = isLoadingUser || isLoadingGrouped || isLoadingUsage;

    if (isLoading || !user) {
        return <LoadingSpinner  />;
    }

    if (hasError) {
        return (
            <Box bg="gray.50" minH="100vh" py={4}>
                <Container maxW="container.xl" px={{ base: 3, md: 6 }}>
                    <ErrorDisplay
                        title="Failed to load summary"
                        message="Unable to fetch summary data. Please try again."
                        onRetry={() => {
                            refetchGrouped();
                            refetchUsage();
                        }}
                        showBack={true}
                    />
                </Container>
            </Box>
        );
    }

    const groupedBookings = groupedData?.data?.data || [];
    const usageSummary = usageData?.data?.data || null;

    return (
        <Box bg="gray.50" minH="100vh" py={4}>
            <Container maxW="container.xl" px={{ base: 3, md: 6 }}>
                <VStack align="stretch" gap={6}>
                    <SummaryHeader userRole={user.role} />

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

export default withAuth(SummaryPage, ['admin', 'owner']);