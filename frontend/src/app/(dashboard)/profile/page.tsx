'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Heading,
    VStack,
    HStack,
    Text,
    Badge,
    Avatar,
    Card,
    SimpleGrid,
    Separator,
    Spinner,
    Flex,
    Container,
} from '@chakra-ui/react';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { useGetMeQuery } from '@/lib/features/auth/authApiSlice';
import { useGetUserByIdQuery } from '@/lib/features/user/userApiSlice';
import { useGetBookingsByUserQuery } from '@/lib/features/booking/bookingApiSlice';
import { formatDate, getRoleColor } from '@/utils/helpers';
import { FiMail, FiCalendar, FiUser, FiBookOpen } from 'react-icons/fi';
import ProfileInfoCard from './components/ProfileInfoCard';
import ProfileActions from './components/ProfileActions';
import UserProfileHeader from './components/UserProfileHeader';
import { useAuth } from "@/lib/hooks/useAuth";
import { setUser } from '@/lib/store/slices/authSlice';
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ErrorDisplay from "@/app/components/ErrorDisplay";

export default function ProfilePage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    useAuth();

    const { data: userData, isLoading: isLoadingUser, error: userError } = useGetMeQuery(undefined);

    useEffect(() => {
        if (userData?.user) {
            dispatch(setUser(userData.user));
        }
    }, [userData, dispatch]);

    const currentUser = userData?.user || user;
    const userId = currentUser?._id || currentUser?.id || '';

    const {
        data: userDetails,
        isLoading: isLoadingDetails,
        error: userDetailsError,
        refetch: refetchUserDetails
    } = useGetUserByIdQuery(userId, {
        skip: !isAuthenticated && !userData?.user || !userId,
    });

    const {
        data: userBookings,
        isLoading: isLoadingBookings,
        error: userBookingsError,
        refetch: refetchUserBookings
    } = useGetBookingsByUserQuery(userId, {
        skip: !isAuthenticated && !userData?.user || !userId,
    });

    const hasError = userError || userDetailsError || userBookingsError;
    const isLoading = isLoadingUser || isLoadingDetails || isLoadingBookings;

    if (isLoadingUser || !user) {
        return (
            <Box bg="gray.50" minH="100vh" py={{ base: 4, md: 8 }}>
                <Container maxW={{ base: 'container.sm', md: 'container.md' }} px={{ base: 4, md: 6 }}>
                    <VStack align="stretch" gap={4}>
                        <UserProfileHeader />
                        <LoadingSpinner
                            message="Loading profile..."
                            subMessage="Fetching your profile information"
                        />
                    </VStack>
                </Container>
            </Box>
        );
    }

    if (hasError) {
        return (
            <Box bg="gray.50" minH="100vh" py={{ base: 4, md: 8 }}>
                <Container maxW={{ base: 'container.sm', md: 'container.md' }} px={{ base: 4, md: 6 }}>
                    <VStack align="stretch" gap={4}>
                        <UserProfileHeader />
                        <ErrorDisplay
                            title="Failed to load profile"
                            message="Unable to fetch your profile data. Please try again."
                            onRetry={() => {
                                refetchUserDetails();
                                refetchUserBookings();
                            }}
                            showBack={true}
                        />
                    </VStack>
                </Container>
            </Box>
        );
    }

    const isLoadingData = isLoadingDetails || isLoadingBookings;
    const userInfo = userDetails?.data?.user || user;
    const bookingCount = userBookings?.data?.bookings?.length || 0;

    // Profile info data for mapping loop
    const profileInfoData = [
        {
            icon: FiMail,
            iconColor: 'blue.500',
            label: 'Email',
            value: userInfo.email,
            isEmail: true,
        },
        {
            icon: FiCalendar,
            iconColor: 'green.500',
            label: 'Joined',
            value: userInfo.createdAt ? formatDate(userInfo.createdAt) : 'Not available',
            isEmail: false,
        },
        {
            icon: FiUser,
            iconColor: 'purple.500',
            label: 'Role',
            value: userInfo.role,
            isEmail: false,
        },
        {
            icon: FiBookOpen,
            iconColor: 'orange.500',
            label: 'Total Bookings',
            value: bookingCount,
            isEmail: false,
        },
    ];

    return (
        <Box bg="gray.50" minH="100vh" py={{ base: 4, md: 8 }}>
            <Container maxW={{ base: 'container.sm', md: 'container.md' }} px={{ base: 4, md: 6 }}>
                <VStack align="stretch" gap={4}>
                    {/* Header */}
                    <UserProfileHeader />

                    {isLoadingData ? (
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
                                    <Text color="gray.500" fontWeight="medium">Loading profile...</Text>
                                    <Text fontSize="sm" color="gray.400">Please wait a moment</Text>
                                </VStack>
                            </Card.Body>
                        </Card.Root>
                    ) : (
                        <Card.Root
                            variant="outline"
                            borderColor="gray.200"
                            borderRadius="2xl"
                            shadow="lg"
                            bg="white"
                            overflow="hidden"
                            maxW="container.sm"
                            mx="auto"
                            w="full"
                        >
                            {/* Cover Image */}
                            <Box
                                bgGradient="to-r"
                                gradientFrom="blue.500"
                                gradientTo="purple.600"
                                h={{ base: '60px', md: '80px' }}
                            />

                            {/* Profile Content */}
                            <Card.Body pt={0} pb={{ base: 4, md: 6 }} px={{ base: 4, md: 6 }}>
                                <Flex
                                    direction="column"
                                    align="center"
                                    gap={{ base: 2, md: 3 }}
                                    mt={{ base: '-30px', md: '-40px' }}
                                >
                                    {/* Avatar */}
                                    <Avatar.Root
                                        size={{ base: 'xl', md: '2xl' }}
                                        ring="4px"
                                        ringColor="blue.500"
                                        shadow="lg"
                                    >
                                        <Avatar.Fallback
                                            name={userInfo.name}
                                            color="blue.600"
                                            fontSize={{ base: '2xl', md: '3xl' }}
                                            fontWeight="bold"
                                        />
                                    </Avatar.Root>

                                    {/* User Info */}
                                    <Box textAlign="center">
                                        <Heading size={{ base: 'md', md: 'lg' }} color="gray.800">
                                            {userInfo.name}
                                        </Heading>
                                        <HStack gap={2} mt={0.5} justify="center" flexWrap="wrap">
                                            <Badge
                                                colorPalette={getRoleColor(userInfo.role)}
                                                fontSize={{ base: 'xs', md: 'sm' }}
                                                px={{ base: 2, md: 3 }}
                                                py={{ base: 0.5, md: 1 }}
                                                borderRadius="full"
                                                textTransform="capitalize"
                                                fontWeight="semibold"
                                            >
                                                {userInfo.role}
                                            </Badge>
                                            <Badge
                                                colorPalette="gray"
                                                variant="subtle"
                                                fontSize={{ base: 'xs', md: 'sm' }}
                                                px={{ base: 2, md: 3 }}
                                                py={{ base: 0.5, md: 1 }}
                                                borderRadius="full"
                                            >
                                                {bookingCount} bookings
                                            </Badge>
                                        </HStack>
                                    </Box>
                                </Flex>

                                <Separator my={{ base: 4, md: 6 }} />

                                {/* Details Grid - Using Loop */}
                                <SimpleGrid columns={{ base: 1, sm: 2 }} gap={{ base: 3, md: 4 }}>
                                    {profileInfoData.map((item, index) => (
                                        <ProfileInfoCard
                                            key={index}
                                            icon={item.icon}
                                            iconColor={item.iconColor}
                                            label={item.label}
                                            value={item.value}
                                            isEmail={item.isEmail}
                                        />
                                    ))}
                                </SimpleGrid>

                                <Separator my={{ base: 4, md: 6 }} />

                                {/* Actions */}
                                <ProfileActions />
                            </Card.Body>
                        </Card.Root>
                    )}
                </VStack>
            </Container>
        </Box>
    );
}