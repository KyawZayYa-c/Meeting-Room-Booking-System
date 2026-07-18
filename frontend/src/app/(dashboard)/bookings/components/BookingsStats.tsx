'use client';

import { Box, Card, Flex, HStack, Text, Badge, Separator } from '@chakra-ui/react';

interface BookingsStatsProps {
    totalBookings: number;
    activeBookings: number;
    pastBookings: number;
    myBookings: number;
    isRefreshing: boolean;
    isLoading: boolean;
}

export default function BookingsStats({
                                          totalBookings,
                                          activeBookings,
                                          pastBookings,
                                          myBookings,
                                          isRefreshing,
                                          isLoading,
                                      }: BookingsStatsProps) {
    const statsData = [
        {
            label: 'TotalBookings',
            value: totalBookings,
            color: 'gray.800',
        },
        {
            label: 'Active',
            value: activeBookings,
            color: 'green.600',
        },
        {
            label: 'Past',
            value: pastBookings,
            color: 'gray.600',
        },
        {
            label: 'My ',
            value: myBookings,
            color: 'blue.600',
        },
    ];

    return (
        <Card.Root
            variant="outline"
            borderColor="gray.200"
            borderRadius="2xl"
            shadow="sm"
            bg="white"
        >
            <Card.Body py={3}>
                <Flex
                    justify="space-between"
                    align="center"
                    flexWrap="wrap"
                    gap={3}
                >
                    <HStack gap={6} flexWrap="wrap">
                        {statsData.map((stat, index) => (
                            <Box key={stat.label}>
                                <Text
                                    fontSize={{ base: '12px', sm: 'xs' }}
                                    color="gray.500"
                                    textTransform="uppercase"
                                    fontWeight="semibold"
                                    letterSpacing="wider"
                                >
                                    {stat.label}
                                </Text>
                                <Text
                                    fontSize={{ base: 'lg', sm: '2xl' }}
                                    fontWeight="bold"
                                    color={stat.color}
                                >
                                    {stat.value}
                                </Text>
                            </Box>
                        ))}
                    </HStack>
                    <Badge
                        colorPalette={isRefreshing || isLoading ? 'blue' : 'green'}
                        variant="subtle"
                        fontSize="xs"
                        px={3}
                        py={1}
                        borderRadius="full"
                    >
                        {isRefreshing || isLoading ? '🔄 Refreshing...' : '✓ Updated'}
                    </Badge>
                </Flex>
            </Card.Body>
        </Card.Root>
    );
}