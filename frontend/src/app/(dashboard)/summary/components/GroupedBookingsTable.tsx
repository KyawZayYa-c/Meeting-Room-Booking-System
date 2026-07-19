'use client';

import { Box, Table, Badge, Text, Icon, HStack } from '@chakra-ui/react';
import { formatDate, formatTime } from '@/utils/helpers';
import { FiCalendar, FiClock } from 'react-icons/fi';

interface GroupedBookingsTableProps {
    bookings: any[];
}

export default function GroupedBookingsTable({ bookings }: GroupedBookingsTableProps) {
    return (
        <Box overflowX="auto" px={{ base: 3, sm: 6 }} py={{ base: 3, sm: 4 }}>
            <Table.Root variant="outline" >
                <Table.Header>
                    <Table.Row bg="gray.50">
                        <Table.ColumnHeader
                            fontWeight="semibold"
                            fontSize={{ base: '11px', sm: 'xs' }}
                            textTransform="uppercase"
                            letterSpacing="wider"
                        >
                            <HStack gap={1}>
                                <Icon as={FiCalendar} boxSize={{ base: 2.5, sm: 3 }} />
                                <Text>Date</Text>
                            </HStack>
                        </Table.ColumnHeader>
                        <Table.ColumnHeader
                            fontWeight="semibold"
                            fontSize={{ base: '11px', sm: 'xs' }}
                            textTransform="uppercase"
                            letterSpacing="wider"
                        >
                            <HStack gap={1}>
                                <Icon as={FiClock} boxSize={{ base: 2.5, sm: 3 }} />
                                <Text>Start</Text>
                            </HStack>
                        </Table.ColumnHeader>
                        <Table.ColumnHeader
                            fontWeight="semibold"
                            fontSize={{ base: '11px', sm: 'xs' }}
                            textTransform="uppercase"
                            letterSpacing="wider"
                        >
                            <HStack gap={1}>
                                <Icon as={FiClock} boxSize={{ base: 2.5, sm: 3 }} />
                                <Text>End</Text>
                            </HStack>
                        </Table.ColumnHeader>
                        <Table.ColumnHeader
                            fontWeight="semibold"
                            fontSize={{ base: '11px', sm: 'xs' }}
                            textTransform="uppercase"
                            letterSpacing="wider"
                        >
                            Created
                        </Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {bookings.map((booking: any, idx: number) => (
                        <Table.Row
                            key={idx}
                            _hover={{ bg: 'gray.50' }}
                            transition="all 0.2s"
                        >
                            <Table.Cell>
                                <Text fontSize={{ base: '12px', sm: 'sm' }} fontWeight="medium" color="gray.700">
                                    {formatDate(booking.date)}
                                </Text>
                            </Table.Cell>
                            <Table.Cell>
                                <Badge colorPalette="purple" variant="subtle" fontSize={{ base: '10px', sm: 'xs' }} px={{ base: 1.5, sm: 2 }} py={0.5} borderRadius="full">
                                    {formatTime(booking.startTime)}
                                </Badge>
                            </Table.Cell>
                            <Table.Cell>
                                <Badge colorPalette="purple" variant="subtle" fontSize={{ base: '10px', sm: 'xs' }} px={{ base: 1.5, sm: 2 }} py={0.5} borderRadius="full">
                                    {formatTime(booking.endTime)}
                                </Badge>
                            </Table.Cell>
                            <Table.Cell fontSize={{ base: '11px', sm: 'xs' }} color="gray.500">
                                {new Date(booking.createdAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Box>
    );
}