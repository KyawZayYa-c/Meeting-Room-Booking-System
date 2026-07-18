'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, VStack } from '@chakra-ui/react';
import { useAppDispatch } from '@/lib/store/hooks';
import { useAppSelector } from '@/lib/store/hooks';
import { useGetMeQuery } from '@/lib/features/auth/authApiSlice';
import { useGetAllBookingsQuery } from '@/lib/features/booking/bookingApiSlice';
import { useGetAllUsersQuery } from '@/lib/features/user/userApiSlice';
import { useLogoutMutation } from '@/lib/features/auth/authApiSlice';
import StatsCards from './components/StatsCards';
import RecentBookings from './components/RecentBookings';
import QuickActions from './components/QuickActions';

export default function DashboardPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [logoutApi] = useLogoutMutation();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const { data: userData } = useGetMeQuery(undefined, { skip: !isAuthenticated });
    const { data: bookingsData } = useGetAllBookingsQuery(undefined, { skip: !isAuthenticated });
    const { data: usersData } = useGetAllUsersQuery(undefined, {
        skip: !isAuthenticated || user?.role !== 'admin',
    });

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    if (!user) return null;

    const currentUser = userData?.user || user;
    const bookings = bookingsData?.data?.bookings || [];
    const users = usersData?.data?.users || [];

    const totalBookings = bookings.length;
    const myBookings = bookings.filter((b: any) => {
        const userId = typeof b.userId === 'object' ? b.userId?._id || b.userId?.id : b.userId;
        const currentUserId = currentUser._id || currentUser.id;
        return userId === currentUserId;
    }).length;

    const recentBookings = bookings.slice(0, 5);

    const statsData = {
        totalBookings,
        myBookings,
        users,
        userRole: user.role,
    };

    // Get user ID safely
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
                <QuickActions userRole={user.role} />
            </VStack>
        </Container>
    );
}