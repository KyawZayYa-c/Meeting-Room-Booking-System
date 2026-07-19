'use client';

import { Box, Card, Table, HStack, Badge, Avatar, Text, Icon, Heading } from '@chakra-ui/react';
import { FiTrendingUp } from 'react-icons/fi';

interface UserStatsTableProps {
    perUser: any[];
    maxBookings: number;
}

export default function UserStatsTable({ perUser, maxBookings }: UserStatsTableProps) {
    return (
        <Card.Root
            variant="outline"
            borderColor="gray.200"
            borderRadius="2xl"
            shadow="sm"
            bg="white"
            overflow="hidden"
        >
            <Card.Body p={0}>
                <Box px={{ base: 5, sm: 6 }} py={{ base: 3, sm: 4 }} borderBottom="1px" borderColor="gray.200" bg="gray.50">
                    <HStack gap={2}>
                        <Icon as={FiTrendingUp} boxSize={4} color="blue.500" />
                        <Heading size={{ base: 'sm', sm: 'md' }} color="gray.800">
                            Bookings Per User
                        </Heading>
                        <Badge colorPalette="gray" variant="subtle" fontSize="xs" px={2} py={0.5} borderRadius="full" ml="auto">
                            {perUser.length} users
                        </Badge>
                    </HStack>
                </Box>

                <Box overflowX="auto" px={{ base: 3, sm: 6 }} py={{ base: 3, sm: 4 }}>
                    <Table.Root variant="outline" size="sm" minWidth="400px">
                        <Table.Header>
                            <Table.Row bg="gray.50">
                                <Table.ColumnHeader fontWeight="semibold" fontSize={{ base: '11px', sm: 'xs' }} textTransform="uppercase" letterSpacing="wider">
                                    User
                                </Table.ColumnHeader>
                                <Table.ColumnHeader fontWeight="semibold" fontSize={{ base: '11px', sm: 'xs' }} textTransform="uppercase" letterSpacing="wider">
                                    Role
                                </Table.ColumnHeader>
                                <Table.ColumnHeader fontWeight="semibold" fontSize={{ base: '11px', sm: 'xs' }} textTransform="uppercase" letterSpacing="wider" textAlign="center">
                                    Bookings
                                </Table.ColumnHeader>
                                <Table.ColumnHeader fontWeight="semibold" fontSize={{ base: '11px', sm: 'xs' }} textTransform="uppercase" letterSpacing="wider">
                                    Progress
                                </Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {perUser.map((user: any) => {
                                const percentage = Math.round((user.count / maxBookings) * 100);

                                return (
                                    <Table.Row
                                        key={user.userId}
                                        _hover={{ bg: 'gray.50' }}
                                        transition="all 0.2s"
                                    >
                                        <Table.Cell>
                                            <HStack gap={2}>
                                                <Avatar.Root size={{ base: 'xs', sm: 'sm' }}>
                                                    <Avatar.Fallback
                                                        name={user.userName}
                                                        bg="blue.100"
                                                        color="blue.600"
                                                        fontSize={{ base: '11px', sm: 'xs' }}
                                                    />
                                                </Avatar.Root>
                                                <Text fontWeight="medium" fontSize={{ base: '11px', sm: 'xs' }} color="gray.700">
                                                    {user.userName}
                                                </Text>
                                            </HStack>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Badge
                                                colorPalette={user.userRole === 'admin' ? 'red' : user.userRole === 'owner' ? 'purple' : 'blue'}
                                                variant="subtle"
                                                fontSize={{ base: '11px', sm: 'xs' }}
                                                px={{ base: 1.5, sm: 2 }}
                                                py={0.5}
                                                borderRadius="full"
                                                textTransform="capitalize"
                                            >
                                                {user.userRole}
                                            </Badge>
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">
                                            <Badge
                                                colorPalette="blue"
                                                variant="solid"
                                                fontSize={{ base: '9px', sm: 'sm' }}
                                                px={{ base: 2, sm: 3 }}
                                                py={{ base: 0.5, sm: 1 }}
                                                borderRadius="full"
                                            >
                                                {user.count}
                                            </Badge>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Box
                                                bg="gray.200"
                                                h={{ base: '5px', sm: '6px' }}
                                                borderRadius="full"
                                                overflow="hidden"
                                            >
                                                <Box
                                                    bg={percentage > 70 ? 'green.500' : percentage > 40 ? 'yellow.500' : 'blue.500'}
                                                    h="100%"
                                                    width={`${percentage}%`}
                                                    borderRadius="full"
                                                    transition="width 0.5s"
                                                />
                                            </Box>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table.Root>
                </Box>
            </Card.Body>
        </Card.Root>
    );
}