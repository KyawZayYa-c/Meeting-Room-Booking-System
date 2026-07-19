'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Container,
    VStack,
    Box,
} from '@chakra-ui/react';
import { useAppSelector } from '@/lib/store/hooks';
import { useGetMeQuery } from '@/lib/features/auth/authApiSlice';
import { useGetAllBookingsQuery, useDeleteBookingMutation } from '@/lib/features/booking/bookingApiSlice';
import { toaster } from '@/components/ui/toaster';
import BookingList from './components/BookingList';
import BookingsHeader from './components/BookingsHeader';
import BookingsStats from './components/BookingsStats';
import ErrorDisplay from "@/app/components/ErrorDisplay";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function BookingsPage() {
    const router = useRouter();
    const { user } = useAppSelector((state) => state.auth);

    const { data: userData, isLoading: isLoadingUser, error: userError } = useGetMeQuery(undefined);

    const {
        data,
        isLoading,
        refetch,
        error: bookingsError
    } = useGetAllBookingsQuery(undefined);

    const [deleteBooking, { isLoading: isDeleting }] = useDeleteBookingMutation();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const hasError = userError || bookingsError;

    if (isLoadingUser) {
        return (
            <LoadingSpinner
                message="Loading bookings..."
                subMessage="Fetching your bookings data"
                fullScreen={true}
            />
        );
    }

    if (!userData?.user) {
        router.push('/login');
        return null;
    }

    if (hasError) {
        return (
            <Box bg="gray.50" minH="100vh" py={{ base: 4, md: 8 }}>
                <Container maxW="container.xl" px={{ base: 3, md: 6 }}>
                    <VStack align="stretch" gap={{ base: 4, md: 6 }}>
                        <BookingsHeader
                            bookingsCount={0}
                            onRefresh={refetch}
                            isRefreshing={isRefreshing}
                            isLoading={isLoading}
                            onBack={() => router.push('/dashboard')}
                            onNewBooking={() => router.push('/bookings/new')}
                        />
                        <ErrorDisplay
                            title="Failed to load bookings"
                            message="Unable to fetch your bookings. Please try again."
                            onRetry={refetch}
                            showBack={false}
                        />
                    </VStack>
                </Container>
            </Box>
        );
    }

    const currentUser = userData.user;
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

    const userId = currentUser._id || currentUser.id || '';

    const activeBookings = bookings.filter((b: any) => new Date(b.date) >= new Date()).length;
    const pastBookings = bookings.filter((b: any) => new Date(b.date) < new Date()).length;
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
                    <BookingsHeader
                        bookingsCount={bookings.length}
                        onRefresh={handleRefresh}
                        isRefreshing={isRefreshing}
                        isLoading={isLoading}
                        onBack={() => router.back()}
                        onNewBooking={() => router.push('/bookings/new')}
                    />

                    <BookingsStats
                        totalBookings={bookings.length}
                        activeBookings={activeBookings}
                        pastBookings={pastBookings}
                        myBookings={myBookings}
                        isRefreshing={isRefreshing}
                        isLoading={isLoading}
                    />

                    {isLoading && !isRefreshing ? (
                        <LoadingSpinner
                            message="Loading bookings..."
                            subMessage="Please wait while we fetch your bookings"
                        />
                    ) : (
                        <BookingList
                            bookings={bookings}
                            currentUserId={userId}
                            userRole={currentUser.role}
                            onDelete={handleDelete}
                            isDeleting={isDeleting}
                        />
                    )}
                </VStack>
            </Container>
        </Box>
    );
}