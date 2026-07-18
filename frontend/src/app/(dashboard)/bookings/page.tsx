'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Container,
    VStack,
    Box,
} from '@chakra-ui/react';
import { useAppSelector } from '@/lib/store/hooks';
import { useGetAllBookingsQuery, useDeleteBookingMutation } from '@/lib/features/booking/bookingApiSlice';
import { toaster } from '@/components/ui/toaster';
import BookingList from './components/BookingList';
import BookingsHeader from './components/BookingsHeader';
import BookingsStats from './components/BookingsStats';
import BookingsLoading from './components/BookingsLoading';

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
    const activeBookings = bookings.filter((b: any) => new Date(b.date) >= new Date()).length;

    // Count past bookings
    const pastBookings = bookings.filter((b: any) => new Date(b.date) < new Date()).length;

    // Count user's own bookings
    const myBookings = bookings.filter((b: any) => {
        const bookingUserId = typeof b.userId === 'object'
            ? b.userId?._id || b.userId?.id
            : b.userId;
        return bookingUserId === userId;
    }).length;

    return (
        <Box bg="gray.50" minH="100vh" py={{ base: 4, md: 8 }}>
            <Container maxW="container.xl" px={{ base: 3, md: 6 }}>
                <VStack align="stretch" gap={{ base: 4, md: 6 }}>
                    {/* Header Section */}
                    <BookingsHeader
                        bookingsCount={bookings.length}
                        onRefresh={handleRefresh}
                        isRefreshing={isRefreshing}
                        isLoading={isLoading}
                        onBack={() => router.push('/dashboard')}
                        onNewBooking={() => router.push('/bookings/new')}
                    />

                    {/* Stats Section */}
                    <BookingsStats
                        totalBookings={bookings.length}
                        activeBookings={activeBookings}
                        pastBookings={pastBookings}
                        myBookings={myBookings}
                        isRefreshing={isRefreshing}
                        isLoading={isLoading}
                    />

                    {/* Booking List */}
                    {isLoading && !isRefreshing ? (
                        <BookingsLoading />
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