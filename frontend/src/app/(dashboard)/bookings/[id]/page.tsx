'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
    Container,
    Box,
    VStack,
    Text,
    Spinner,
    Card,
    Separator,
    SimpleGrid,
    Button
} from '@chakra-ui/react';
import { useAppSelector } from '@/lib/store/hooks';
import { useGetBookingByIdQuery, useDeleteBookingMutation } from '@/lib/features/booking/bookingApiSlice';
import { formatDate, formatTime } from '@/utils/helpers';
import { toaster } from '@/components/ui/toaster';
import { FiCalendar, FiClock, FiClock as FiDuration, FiBookOpen } from 'react-icons/fi';
import BookingDetailHeader from './components/BookingDetailHeader';
import BookingDetailBanner from './components/BookingDetailBanner';
import BookingUserInfo from './components/BookingUserInfo';
import BookingDetailItem from './components/BookingDetailItem';
import BookingDetailActions from './components/BookingDetailActions';

export default function BookingDetailPage() {
    const router = useRouter();
    const params = useParams();
    const bookingId = params.id as string;
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const { data, isLoading } = useGetBookingByIdQuery(bookingId, { skip: !bookingId || !isAuthenticated });
    const [deleteBooking, { isLoading: isDeleting }] = useDeleteBookingMutation();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    const booking = data?.data?.booking;

    const canDelete = () => {
        if (!user || !booking) return false;
        if (user.role === 'admin' || user.role === 'owner') return true;
        const userId = typeof booking.userId === 'object' ? booking.userId?._id || booking.userId?.id : booking.userId;
        const currentUserId = user._id || user.id;
        return userId === currentUserId;
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this booking?')) return;
        try {
            await deleteBooking(bookingId).unwrap();
            toaster.create({
                title: 'Booking deleted successfully',
                type: 'success',
            });
            router.push('/bookings');
        } catch (error: any) {
            toaster.create({
                title: error.data?.message || 'Failed to delete booking',
                type: 'error',
            });
        }
    };

    if (isLoading) {
        return (
            <Box bg="gray.50" minH="100vh" py={8}>
                <Container maxW="container.md" py={20} textAlign="center">
                    <Card.Root variant="outline" borderColor="gray.200" borderRadius="2xl" shadow="sm" bg="white">
                        <Card.Body py={20}>
                            <VStack gap={4}>
                                <Spinner size="xl" colorPalette="blue" />
                                <Text color="gray.500" fontWeight="medium">Loading booking details...</Text>
                                <Text fontSize="sm" color="gray.400">Please wait a moment</Text>
                            </VStack>
                        </Card.Body>
                    </Card.Root>
                </Container>
            </Box>
        );
    }

    if (!booking) {
        return (
            <Box bg="gray.50" minH="100vh" py={8}>
                <Container maxW="container.md" py={20} textAlign="center">
                    <Card.Root variant="outline" borderColor="gray.200" borderRadius="2xl" borderStyle="dashed" borderWidth="2px" bg="gray.50">
                        <Card.Body py={16}>
                            <VStack gap={4}>
                                <Box fontSize="5xl">📭</Box>
                                <Text fontSize="lg" fontWeight="semibold" color="gray.600">Booking not found</Text>
                                <Text fontSize="sm" color="gray.400">The booking you are looking for does not exist</Text>
                                <Button colorPalette="blue" onClick={() => router.back()} borderRadius="xl" mt={2}>
                                    Go Back
                                </Button>
                            </VStack>
                        </Card.Body>
                    </Card.Root>
                </Container>
            </Box>
        );
    }

    const userName = typeof booking.userId === 'object' ? booking.userId?.name || 'Unknown' : 'Unknown';
    const userEmail = typeof booking.userId === 'object' ? booking.userId?.email || '' : '';
    const userRole = typeof booking.userId === 'object' ? booking.userId?.role || 'user' : 'user';

    const isMine = (() => {
        if (!user) return false;
        const userId = typeof booking.userId === 'object' ? booking.userId?._id || booking.userId?.id : booking.userId;
        const currentUserId = user._id || user.id;
        return userId === currentUserId;
    })();

    const duration = (() => {
        const [startH, startM] = booking.startTime.split(':').map(Number);
        const [endH, endM] = booking.endTime.split(':').map(Number);
        const diff = (endH - startH) + (endM - startM) / 60;
        return diff;
    })();

    const detailItems = [
        { icon: FiCalendar, label: 'Date', value: formatDate(booking.date), color: 'blue' },
        { icon: FiClock, label: 'Time', value: `${formatTime(booking.startTime)} - ${formatTime(booking.endTime)}`, color: 'purple' },
        { icon: FiDuration, label: 'Duration', value: `${duration} hour${duration > 1 ? 's' : ''}`, color: 'orange' },
        { icon: FiBookOpen, label: 'Created', value: booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A', color: 'green' },
    ];

    return (
        <Box bg="gray.50" minH="100vh" py={4}>
            <Container maxW="container.md" px={{ base: 4, md: 6 }}>
                <VStack align="stretch" gap={4}>
                    {/* Header */}
                    <BookingDetailHeader />

                    <Card.Root
                        variant="outline"
                        borderColor="gray.200"
                        borderRadius="2xl"
                        shadow="lg"
                        bg="white"
                        overflow="hidden"
                    >
                        {/* Header Banner */}
                        <BookingDetailBanner bookingId={bookingId} isMine={isMine} />

                        <Card.Body p={{ base: 4, md: 6 }}>
                            <VStack align="stretch" gap={6}>
                                {/* User Info */}
                                <BookingUserInfo
                                    userName={userName}
                                    userEmail={userEmail}
                                    userRole={userRole}
                                    isMine={isMine}
                                />

                                <Separator borderColor="gray.200" />

                                {/* Booking Details Grid - Using Loop */}
                                <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
                                    {detailItems.map((item) => (
                                        <BookingDetailItem
                                            key={item.label}
                                            icon={item.icon}
                                            label={item.label}
                                            value={item.value}
                                            color={item.color}
                                        />
                                    ))}
                                </SimpleGrid>

                                <Separator borderColor="gray.200" />

                                {/* Actions */}
                                <BookingDetailActions
                                    canDelete={canDelete()}
                                    onDelete={handleDelete}
                                    isDeleting={isDeleting}
                                />
                            </VStack>
                        </Card.Body>
                    </Card.Root>
                </VStack>
            </Container>
        </Box>
    );
}