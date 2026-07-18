'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, Heading, Text, VStack, Badge } from '@chakra-ui/react';
import { useAppSelector } from '@/lib/store/hooks';
import { useGetMeQuery } from '@/lib/features/auth/authApiSlice';

export default function DashboardPage() {
    const router = useRouter();
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const { data, isLoading } = useGetMeQuery(undefined, { skip: !isAuthenticated });
    const user = data?.user;

    useEffect(() => {
        if (!isAuthenticated) router.push('/login');
    }, [isAuthenticated, router]);

    if (isLoading) return <Container py={10}><Text>Loading...</Text></Container>;
    if (!user) return null;

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin':
                return 'red';
            case 'owner':
                return 'purple';
            default:
                return 'blue';
        }
    };

    return (
        <Container maxW="container.xl" py={10}>
            <VStack align="stretch" gap={6}>
                <Box>
                    <Heading size="lg">Welcome, {user.name}!</Heading>
                    <Text color="gray.600">
                        Role: <Badge colorScheme={getRoleColor(user.role)}>{user.role}</Badge>
                    </Text>
                </Box>
            </VStack>
        </Container>
    );
}