'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Container,
    VStack,
    Box,
} from '@chakra-ui/react';
import {useEffect} from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import { useGetMeQuery } from '@/lib/features/auth/authApiSlice';
import { useGetAllUsersQuery, useDeleteUserMutation } from '@/lib/features/user/userApiSlice';
import { toaster } from '@/components/ui/toaster';
import UserList from './components/UserList';
import AdminUsersHeader from './components/AdminUsersHeader';
import AdminUsersStats from './components/AdminUsersStats';
import AdminUsersLoading from './components/AdminUsersLoading';
import ErrorDisplay from "@/app/components/ErrorDisplay";
import { setUser } from '@/lib/store/slices/authSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { withAuth } from '@/lib/hooks/withAuth';

function AdminUsersPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    const { data: userData, isLoading: isLoadingUser, error: userError } = useGetMeQuery(undefined, {
        skip: !isAuthenticated,
    });

    const {
        data,
        isLoading,
        refetch,
        error: usersError
    } = useGetAllUsersQuery(undefined, {
        skip: !isAuthenticated,
    });

    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        if (userData?.user) {
            dispatch(setUser(userData.user));
        }
    }, [userData, dispatch]);

    const hasError = userError || usersError;

    if (isLoadingUser || !user) {
        return <AdminUsersLoading />;
    }

    if (user.role !== 'admin') {
        return null;
    }

    if (hasError) {
        return (
            <Box bg="gray.50" minH="100vh" py={{ base: 4, md: 8 }}>
                <Container maxW="container.xl" px={{ base: 3, md: 6 }}>
                    <VStack align="stretch" gap={{ base: 4, md: 6 }}>
                        <AdminUsersHeader
                            usersCount={0}
                            onRefresh={refetch}
                            isRefreshing={isRefreshing}
                            isLoading={isLoading}
                            onBack={() => router.back()}
                            onNewUser={() => router.push('/admin/users/new')}
                        />
                        <ErrorDisplay
                            title="Failed to load users"
                            message="Unable to fetch users list. Please try again."
                            onRetry={refetch}
                            showBack={false}
                        />
                    </VStack>
                </Container>
            </Box>
        );
    }

    const users = data?.data?.users || [];

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this user? All their bookings will also be removed.')) {
            return;
        }
        try {
            await deleteUser(id).unwrap();
            toaster.create({
                title: 'User deleted successfully',
                type: 'success',
            });
            refetch();
        } catch (error: any) {
            toaster.create({
                title: error.data?.message || 'Failed to delete user',
                type: 'error',
            });
        }
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await refetch();
        setTimeout(() => {
            setIsRefreshing(false);
            toaster.create({
                title: 'Users refreshed',
                type: 'success',
            });
        }, 500);
    };

    const adminCount = users.filter((u: any) => u.role === 'admin').length;
    const ownerCount = users.filter((u: any) => u.role === 'owner').length;
    const userCount = users.filter((u: any) => u.role === 'user').length;

    return (
        <Box bg="gray.50" minH="100vh" py={{ base: 4, md: 8 }}>
            <Container maxW="container.xl" px={{ base: 3, md: 6 }}>
                <VStack align="stretch" gap={{ base: 4, md: 6 }}>
                    <AdminUsersHeader
                        usersCount={users.length}
                        onRefresh={handleRefresh}
                        isRefreshing={isRefreshing}
                        isLoading={isLoading}
                        onBack={() => router.back()}
                        onNewUser={() => router.push('/admin/users/new')}
                    />

                    <AdminUsersStats
                        totalUsers={users.length}
                        adminCount={adminCount}
                        ownerCount={ownerCount}
                        userCount={userCount}
                        isRefreshing={isRefreshing}
                        isLoading={isLoading}
                    />

                    {isLoading && !isRefreshing ? (
                        <AdminUsersLoading />
                    ) : (
                        <UserList
                            users={users}
                            currentUserId={user._id || user.id || ''}
                            onDelete={handleDelete}
                            isDeleting={isDeleting}
                            onRefresh={refetch}
                        />
                    )}
                </VStack>
            </Container>
        </Box>
    );
}

export default withAuth(AdminUsersPage, ['admin']);