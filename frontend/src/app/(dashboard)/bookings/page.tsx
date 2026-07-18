'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Container,
    Heading,
    VStack,
    Box,
    Button,
    HStack,
    Text,
    Spinner,
    Card,
    Flex,
    Icon,
    Badge,
} from '@chakra-ui/react';
import { useAppSelector } from '@/lib/store/hooks';
import { useGetAllBookingsQuery, useDeleteBookingMutation } from '@/lib/features/booking/bookingApiSlice';
import { toaster } from '@/components/ui/toaster';
import BookingList from './components/BookingList';
import { FiPlus, FiArrowLeft, FiCalendar, FiRefreshCw } from 'react-icons/fi';

export default function BookingsPage() {
    const router = useRouter();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const { data, isLoading, refetch } = useGetAllBookingsQuery(undefined, { skip: !isAuthenticated });
    const [deleteBooking, { isLoading: isDeleting }] = useDeleteBookingMutation();
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    const bookings = data?.data?.bookings || [];

    const handleDelete = async (id: string) => {
        try {
            await deleteBooking(id).unwrap();
            toaster.create({
                title: 'Booking deleted successfully',
                type: 'success',
            });
            refetch();
        } catch (error: any) {
            toaster.create({
                title: error.data?.message || 'Failed to delete booking',
                type: 'error',
            });
        }
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await refetch();
        setTimeout(() => {
            setIsRefreshing(false);
        }, 500);
    };

    if (!user) return null;

    const userId = user._id || user.id || '';

    // Count active bookings (today or future)
    const activeBookings = bookings.filter(b => new Date(b.date) >= new Date()).length;

    return (
        <Box bg="gray.50" minH="100vh" py={8}>
            <Container maxW="container.xl">
                <VStack align="stretch" gap={6}>
                    {/* Header Section */}
                    <Card.Root
                        variant="outline"
                        borderColor="gray.200"
                        borderRadius="2xl"
                        shadow="sm"
                        bg="white"
                        overflow="hidden"
                    >
                        <Card.Body py={4}>
                            <Flex
                                justify="space-between"
                                align="center"
                                flexWrap="wrap"
                                gap={4}
                            >
                                {/* Left side: Back + Title */}
                                <HStack gap={3}>
                                    <Button
                                        overflow={"hidden"}
                                        variant="ghost"
                                        onClick={() => router.push('/dashboard')}
                                        borderRadius="full"
                                        colorPalette="gray"
                                        bg='gray.50'
                                        _hover={{ bg: 'gray.100', transform: 'scale(0.95)' }}
                                        transition="all 0.2s"
                                    >
                                        <Icon as={FiArrowLeft} />
                                    </Button>
                                    <Box>
                                        <HStack gap={2}>
                                            <Icon as={FiCalendar} color="blue.500" boxSize={5} />
                                            <Heading size="lg" color="gray.800" fontWeight="bold">
                                                Bookings
                                            </Heading>
                                            <Badge
                                                colorPalette="gray"
                                                variant="subtle"
                                                fontSize="xs"
                                                px={2}
                                                py={0.5}
                                                borderRadius="full"
                                                ml={1}
                                            >
                                                {bookings.length}
                                            </Badge>
                                        </HStack>
                                        <Text fontSize="sm" color="gray.500" ml={7}>
                                            View and manage all room bookings
                                        </Text>
                                    </Box>
                                </HStack>

                                {/* Right side: Refresh + New Booking */}
                                <HStack gap={3} >
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleRefresh}
                                        borderRadius="full"
                                        colorPalette="blue"
                                        _hover={{ bg: 'blue.50' }}
                                        loading={isRefreshing || isLoading}
                                        loadingText="Refreshing"
                                    >
                                        <Icon
                                            as={FiRefreshCw}
                                            mr={1}
                                            animation={isRefreshing || isLoading ? 'spin 1s linear infinite' : 'none'}
                                        />
                                        Refresh
                                    </Button>
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
                                        <Icon as={FiPlus} mr={1} />
                                        New Booking
                                    </Button>
                                </HStack>
                            </Flex>
                        </Card.Body>
                    </Card.Root>

                    {/* Booking List */}
                    {isLoading && !isRefreshing ? (
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
                    ) : (
                        <BookingList
                            bookings={bookings}
                            currentUserId={userId}
                            userRole={user.role}
                            onDelete={handleDelete}
                            isDeleting={isDeleting}
                        />
                    )}
                </VStack>
            </Container>
        </Box>
    );
}