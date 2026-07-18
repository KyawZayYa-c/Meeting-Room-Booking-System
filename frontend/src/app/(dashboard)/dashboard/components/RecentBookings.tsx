'use client';

import {
    Box,
    Card,
    Flex,
    Heading,
    HStack,
    Stack,
    Text,
    Badge,
    Avatar,
    VStack,
    Icon,
} from '@chakra-ui/react';
import { Booking } from '@/lib/types';
import { formatDate } from '@/utils/helpers';
import { FaUser, FaUserCheck } from 'react-icons/fa';

interface RecentBookingsProps {
    bookings: Booking[];
    currentUserId: string;
    onViewAll: () => void;
}

export default function RecentBookings({ bookings, currentUserId, onViewAll }: RecentBookingsProps) {
    if (bookings.length === 0) {
        return (
            <Box>
                <HStack justify="space-between" mb={4}>
                    <Heading size="lg" color="gray.700">
                        📋 Recent Bookings
                    </Heading>
                    <Text
                        fontSize="sm"
                        color="blue.500"
                        cursor="pointer"
                        fontWeight="medium"
                        _hover={{ textDecoration: 'underline' }}
                        onClick={onViewAll}
                    >
                        View All →
                    </Text>
                </HStack>
                <Card.Root shadow="md" borderRadius="2xl" bg="gray.50">
                    <Card.Body py={12}>
                        <VStack gap={3}>
                            <Text fontSize="4xl">📭</Text>
                            <Text color="gray.500" fontWeight="medium">
                                No bookings found
                            </Text>
                            <Text fontSize="sm" color="gray.400">
                                Create your first booking! 🚀
                            </Text>
                        </VStack>
                    </Card.Body>
                </Card.Root>
            </Box>
        );
    }

    return (
        <Box>
            <HStack justify="space-between" mb={4}>
                <Heading size="lg" color="gray.700">
                    📋 Recent Bookings
                </Heading>
                <Text
                    fontSize="sm"
                    color="blue.500"
                    cursor="pointer"
                    fontWeight="medium"
                    _hover={{ textDecoration: 'underline' }}
                    onClick={onViewAll}
                >
                    View All →
                </Text>
            </HStack>

            <Card.Root shadow="md" borderRadius="2xl" overflow="hidden" border="1px" borderColor="gray.100">
                <Card.Body p={0}>
                    <Stack gap={0}>
                        {bookings.map((booking: any, index: number) => {
                            const userName =
                                typeof booking.userId === 'object'
                                    ? booking.userId?.name || 'Unknown'
                                    : 'Unknown';
                            const isMine =
                                booking.userId === currentUserId ||
                                (typeof booking.userId === 'object' &&
                                    booking.userId?._id === currentUserId);

                            return (
                                <Box
                                    key={booking._id}
                                    borderBottom={index < bookings.length - 1 ? '1px' : 'none'}
                                    borderColor="gray.100"
                                    _hover={{ bg: 'gray.50' }}
                                    transition="all 0.2s"
                                >
                                    <Flex
                                        align="center"
                                        p={4}
                                        gap={4}
                                        width="100%"
                                        direction={{ base: 'column', sm: 'row' }}
                                    >
                                        <Flex align="center" gap={3} flex="1" minW="0" pr="10" width={{ base: '100%', md: 'auto' }} whiteSpace="nowrap">
                                            <Avatar.Root
                                                size="md"
                                                bg={isMine ? 'green.100' : 'gray.100'}
                                                flexShrink={0}
                                            >
                                                <Avatar.Fallback
                                                    name={userName}
                                                    bg="transparent"
                                                    color={isMine ? 'green.600' : 'gray.600'}
                                                    fontWeight="bold"
                                                />
                                            </Avatar.Root>
                                            <Text fontWeight="semibold" color="gray.700"  fontSize="md">
                                                {userName}
                                            </Text>
                                        </Flex>

                                        <Flex
                                            flex="1"
                                            justify={{ base: 'flex-start', sm: 'center' }}
                                            width={{ base: '100%', sm: 'auto' }}
                                        >
                                            <HStack gap={2.5} bg="gray.100/50" px={4} py={1.5} borderRadius="full" whiteSpace="nowrap">
                                                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                                                    {formatDate(booking.date)}
                                                </Text>
                                                <Box w="1" h="1" bg="gray.300" borderRadius="full" />
                                                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                                                    {booking.startTime} - {booking.endTime}
                                                </Text>
                                            </HStack>
                                        </Flex>

                                        <Flex
                                            flex="1"
                                            justify={{ base: 'flex-start', sm : 'flex-end' }}
                                            width={{ base: '100%', sm: 'auto' }}
                                            flexShrink={0}
                                        >
                                            <Badge
                                                colorPalette={isMine ? 'green' : 'gray'}
                                                variant="subtle"
                                                fontSize="xs"
                                                px={3}
                                                py={1}
                                                borderRadius="full"
                                                display="flex"
                                                alignItems="center"
                                                gap={1.5}
                                            >
                                                {isMine ? (
                                                    <>
                                                        <Icon as={FaUserCheck} boxSize={3} />
                                                        Mine
                                                    </>
                                                ) : (
                                                    <>
                                                        <Icon as={FaUser} boxSize={3} />
                                                        Guest
                                                    </>
                                                )}
                                            </Badge>
                                        </Flex>
                                    </Flex>
                                </Box>
                            );
                        })}
                    </Stack>
                </Card.Body>
            </Card.Root>
        </Box>
    );
}