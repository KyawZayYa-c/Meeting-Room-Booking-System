'use client';

import {
    Box,
    Table,
    Badge,
    Button,
    HStack,
    Text,
    Avatar,
    Card,
} from '@chakra-ui/react';
import { Booking } from '@/lib/types';
import { formatDate, formatTime } from '@/utils/helpers';
import { FiTrash2, FiCalendar, FiClock, FiUser, FiEye } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

interface BookingListProps {
    bookings: Booking[];
    currentUserId: string;
    userRole: string;
    onDelete: (id: string) => void;
    isDeleting: boolean;
    deletingId?: string | null;
}

export default function BookingList({
                                        bookings,
                                        currentUserId,
                                        userRole,
                                        onDelete,
                                        isDeleting,
                                        deletingId = null,
                                    }: BookingListProps) {
    const router = useRouter();

    const canDelete = (booking: Booking) => {
        if (userRole === 'admin' || userRole === 'owner') return true;
        const userId = typeof booking.userId === 'object'
            ? booking.userId?._id || booking.userId?.id
            : booking.userId;
        return userId === currentUserId;
    };

    const canView = () => {
        return userRole === 'admin' || userRole === 'owner';
    };

    const getUserName = (booking: Booking) => {
        if (typeof booking.userId === 'object' && booking.userId) {
            return booking.userId.name || 'Unknown';
        }
        return 'Unknown';
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Check if booking is past (date + time)
    const isPastBooking = (booking: Booking) => {
        const bookingDate = new Date(booking.date);
        const [hours, minutes] = booking.startTime.split(':').map(Number);
        bookingDate.setHours(hours, minutes, 0, 0);
        return bookingDate < new Date();
    };

    if (bookings.length === 0) {
        return (
            <Card.Root
                variant="outline"
                borderColor="gray.200"
                bg="gray.50"
                borderRadius="2xl"
                borderStyle="dashed"
                borderWidth="2px"
            >
                <Card.Body py={16} textAlign="center">
                    <Box fontSize="5xl" mb={4}>📅</Box>
                    <Text fontSize="lg" fontWeight="semibold" color="gray.600">
                        No bookings yet
                    </Text>
                    <Text fontSize="sm" color="gray.400" mt={1}>
                        Click "New Booking" to get started
                    </Text>
                </Card.Body>
            </Card.Root>
        );
    }

    return (
        <Card.Root
            variant="outline"
            borderColor="gray.100"
            borderRadius="2xl"
            overflow="hidden"
        >
            <Box
                overflowX="auto"
                css={{
                    '&::-webkit-scrollbar': {
                        height: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: 'gray.50',
                        borderRadius: 'full',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'gray.300',
                        borderRadius: 'full',
                        '&:hover': {
                            background: 'gray.400',
                        },
                    },
                }}
            >
                <Table.Root variant="outline" bg="white" minWidth="650px">
                    <Table.Header>
                        <Table.Row bg="gray.50">
                            <Table.ColumnHeader
                                fontWeight="semibold"
                                fontSize="xs"
                                textTransform="uppercase"
                                letterSpacing="wider"
                                minWidth="120px"
                            >
                                <HStack gap={2}>
                                    <FiUser size={14} />
                                    <Text>User</Text>
                                </HStack>
                            </Table.ColumnHeader>
                            <Table.ColumnHeader
                                fontWeight="semibold"
                                fontSize="xs"
                                textTransform="uppercase"
                                letterSpacing="wider"
                                minWidth="120px"
                            >
                                <HStack gap={2}>
                                    <FiCalendar size={14} />
                                    <Text>Date</Text>
                                </HStack>
                            </Table.ColumnHeader>
                            <Table.ColumnHeader
                                fontWeight="semibold"
                                fontSize="xs"
                                textTransform="uppercase"
                                letterSpacing="wider"
                                minWidth="140px"
                            >
                                <HStack gap={2}>
                                    <FiClock size={14} />
                                    <Text>Time</Text>
                                </HStack>
                            </Table.ColumnHeader>
                            <Table.ColumnHeader
                                fontWeight="semibold"
                                fontSize="xs"
                                textTransform="uppercase"
                                letterSpacing="wider"
                                minWidth="100px"
                            >
                                Status
                            </Table.ColumnHeader>
                            <Table.ColumnHeader
                                textAlign="center"
                                fontWeight="semibold"
                                fontSize="xs"
                                textTransform="uppercase"
                                letterSpacing="wider"
                                minWidth="120px"
                            >
                                Actions
                            </Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {bookings.map((booking) => {
                            const userName = getUserName(booking);
                            const bookingUserId = typeof booking.userId === 'object'
                                ? booking.userId?._id || booking.userId?.id
                                : booking.userId;
                            const isMine = bookingUserId === currentUserId;
                            const showView = canView();
                            const isPast = isPastBooking(booking);

                            return (
                                <Table.Row
                                    key={booking._id}
                                    _hover={{ bg: isPast ? 'gray.100' : 'gray.50' }}
                                    transition="all 0.2s"
                                    opacity={isPast ? 0.6 : 1}
                                    bg={isPast ? 'gray.50' : 'white'}
                                >
                                    <Table.Cell>
                                        <HStack gap={3}>
                                            <Avatar.Root size="sm">
                                                <Avatar.Fallback
                                                    bg={isMine ? 'green.100' : 'blue.50'}
                                                    color={isMine ? 'green.600' : 'blue.600'}
                                                    fontWeight="bold"
                                                    fontSize="xs"
                                                >
                                                    {getInitials(userName)}
                                                </Avatar.Fallback>
                                            </Avatar.Root>
                                            <Box>
                                                <Text
                                                    fontWeight="medium"
                                                    fontSize="sm"
                                                    color={isPast ? 'gray.500' : 'gray.700'}
                                                >
                                                    {userName}
                                                </Text>
                                                {isMine && (
                                                    <Badge
                                                        colorPalette="green"
                                                        variant="solid"
                                                        fontSize="9px"
                                                        px={2}
                                                        py={0.5}
                                                        borderRadius="full"
                                                        mt={0.5}
                                                        display="inline-block"
                                                        opacity={isPast ? 0.6 : 1}
                                                    >
                                                        You
                                                    </Badge>
                                                )}
                                                {isPast && (
                                                    <Badge
                                                        colorPalette="gray"
                                                        variant="subtle"
                                                        fontSize="9px"
                                                        px={2}
                                                        py={0.5}
                                                        borderRadius="full"
                                                        mt={0.5}
                                                        ml={1}
                                                        display="inline-block"
                                                    >
                                                        Past
                                                    </Badge>
                                                )}
                                            </Box>
                                        </HStack>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Text
                                            fontSize="sm"
                                            fontWeight="medium"
                                            color={isPast ? 'gray.500' : 'gray.700'}
                                        >
                                            {formatDate(booking.date)}
                                        </Text>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Badge
                                            colorPalette={isPast ? 'gray' : 'purple'}
                                            variant={isPast ? 'subtle' : 'subtle'}
                                            fontSize="xs"
                                            px={3}
                                            py={1}
                                            borderRadius="full"
                                            opacity={isPast ? 0.6 : 1}
                                        >
                                            {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Badge
                                            colorPalette={isPast ? 'gray' : (isMine ? 'green' : 'blue')}
                                            variant="subtle"
                                            fontSize="xs"
                                            px={3}
                                            py={1}
                                            borderRadius="full"
                                            opacity={isPast ? 0.6 : 1}
                                        >
                                            {isPast ? 'Completed' : (isMine ? '✓ Mine' : 'Guest')}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell textAlign="center">
                                        <HStack justify="center" gap={1}>
                                            {showView && (
                                                <Button
                                                    size="xs"
                                                    colorPalette="blue"
                                                    variant="ghost"
                                                    onClick={() => router.push(`/bookings/${booking._id}`)}
                                                    _hover={{ bg: 'blue.100', transform: 'scale(1.05)' }}
                                                    transition="all 0.2s"
                                                    borderRadius="full"
                                                    px={2}
                                                    opacity={isPast ? 0.5 : 1}
                                                    cursor={isPast ? 'default' : 'pointer'}
                                                >
                                                    <FiEye size={14} />
                                                    <Text ml={1}>View</Text>
                                                </Button>
                                            )}

                                            {canDelete(booking) && (
                                                <Button
                                                    size="xs"
                                                    variant="ghost"
                                                    colorPalette="red"
                                                    onClick={() => onDelete(booking._id)}
                                                    loading={isDeleting}
                                                    _hover={{ bg: 'red.50', transform: 'scale(1.05)' }}
                                                    transition="all 0.2s"
                                                    borderRadius="full"
                                                    px={2}
                                                    opacity={isPast ? 0.5 : 1}
                                                >
                                                    <FiTrash2 size={14} />
                                                    <Text ml={1}>Delete</Text>
                                                </Button>
                                            )}
                                        </HStack>
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table.Root>
            </Box>
        </Card.Root>
    );
}