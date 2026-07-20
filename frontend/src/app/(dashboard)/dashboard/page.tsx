'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, VStack, Box } from '@chakra-ui/react';
import { useAppDispatch } from '@/lib/store/hooks';
import { useAppSelector } from '@/lib/store/hooks';
import { useGetMeQuery } from '@/lib/features/auth/authApiSlice';
import { useGetAllBookingsQuery } from '@/lib/features/booking/bookingApiSlice';
import { useGetAllUsersQuery } from '@/lib/features/user/userApiSlice';
import { useAuth } from '@/lib/hooks/useAuth';
import StatsCards from './components/StatsCards';
import RecentBookings from './components/RecentBookings';
import { setUser } from "@/lib/store/slices/authSlice";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ErrorDisplay from "@/app/components/ErrorDisplay";

export default function DashboardPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    useAuth();

    const { data: userData, isLoading: isLoadingUser, error: userError } = useGetMeQuery(undefined);

    const {
        data: bookingsData,
        isLoading: isLoadingBookings,
        error: bookingsError,
        refetch: refetchBookings
    } = useGetAllBookingsQuery(undefined, {
        skip: !isAuthenticated && !userData?.user,
    });

    const {
        data: usersData,
        error: usersError,
        refetch: refetchUsers
    } = useGetAllUsersQuery(undefined, {
        skip: !isAuthenticated && !userData?.user || user?.role !== 'admin' && user?.role !== 'owner',
    });

    useEffect(() => {
        if (userData?.user) {
            dispatch(setUser(userData.user));
        }
    }, [userData, dispatch]);

    const hasError = userError || bookingsError || usersError;
    const isLoading = isLoadingUser || isLoadingBookings;

    if (isLoading) {
        return (
            <LoadingSpinner
                message="Loading your dashboard..."
                subMessage="Fetching your data and bookings"
            />
        );
    }

    // Error state
    if (hasError) {
        return (
            <Box bg="gray.50" minH="100vh" py={8}>
                <Container maxW="container.xl">
                    <ErrorDisplay
                        title="Failed to load dashboard"
                        message="Unable to fetch your dashboard data. Please try again."
                        onRetry={() => {
                            refetchBookings();
                            if (user?.role === 'admin') {
                                refetchUsers();
                            }
                        }}
                        showBack={false}
                    />
                </Container>
            </Box>
        );
    }

    if (!userData?.user) return null;

    const currentUser = userData.user;
    const bookings = bookingsData?.data?.bookings || [];
    const users = usersData?.data?.users || [];

    const totalBookings = bookings.length;
    const myBookings = bookings.filter((b: any) => {
        const userId = typeof b.userId === 'object' ? b.userId?._id || b.userId?.id : b.userId;
        const currentUserId = currentUser._id || currentUser.id;
        return userId === currentUserId;
    }).length;

    const recentBookings = [...bookings]
        .sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
        })
        .slice(0, 5);


    const statsData = {
        totalBookings,
        myBookings,
        users,
        userRole: currentUser.role,
    };

    const currentUserId = currentUser._id || currentUser.id || '';

    return (
        <Container maxW="container.xl" py={8}>
            <VStack align="stretch" gap={8}>
                <StatsCards stats={statsData} />
                <RecentBookings
                    bookings={recentBookings}
                    currentUserId={currentUserId}
                    onViewAll={() => router.push('/bookings')}
                />
            </VStack>
        </Container>
    );
}