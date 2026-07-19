'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Container,
    VStack,
    Box,
    Card,
} from '@chakra-ui/react';
import { useAppSelector } from '@/lib/store/hooks';
import { useGetBookingsByUserQuery } from '@/lib/features/booking/bookingApiSlice';
import { useDeleteBookingMutation } from '@/lib/features/booking/bookingApiSlice';
import { toaster } from '@/components/ui/toaster';
import BookingList from '../bookings/components/BookingList';
import MyBookingsHeader from './components/MyBookingsHeader';
import MyBookingsLoading from './components/MyBookingsLoading';
import MyBookingsEmpty from './components/MyBookingsEmpty';

export default function MyBookingsPage() {
    const router = useRouter();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const userId = user?._id || user?.id || '';

    const { data, isLoading, refetch } = useGetBookingsByUserQuery(userId, {
        skip: !userId || !isAuthenticated,
    });

    const [deleteBooking, { isLoading: isDeleting }] = useDeleteBookingMutation();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    const bookings = data?.data?.bookings ?? [];

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

    if (!user) return null;

    return (
        <Box bg="gray.50" minH="100vh" py={{ base: 4, md: 8 }}>
            <Container maxW="container.xl" px={{ base: 3, md: 6 }}>
                <VStack align="stretch" gap={6}>
                    {/* Header */}
                    <MyBookingsHeader />

                    {/* Booking List */}
                    {isLoading ? (
                        <MyBookingsLoading />
                    ) : bookings.length === 0 ? (
                        <MyBookingsEmpty />
                    ) : (
                        <Card.Root
                            variant="outline"
                            borderColor="gray.200"
                            borderRadius="2xl"
                            shadow="sm"
                            bg="white"
                            overflow="hidden"
                        >
                            <Card.Body p={0}>
                                <BookingList
                                    bookings={bookings}
                                    currentUserId={userId}
                                    userRole={user.role}
                                    onDelete={handleDelete}
                                    isDeleting={isDeleting}
                                />
                            </Card.Body>
                        </Card.Root>
                    )}
                </VStack>
            </Container>
        </Box>
    );
}