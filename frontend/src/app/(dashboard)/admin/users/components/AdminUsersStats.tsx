'use client';

import { Box, Card, Flex, HStack, Text, Badge, Separator, Icon } from '@chakra-ui/react';
import { FiShield } from 'react-icons/fi';

interface AdminUsersStatsProps {
    totalUsers: number;
    adminCount: number;
    ownerCount: number;
    userCount: number;
    isRefreshing: boolean;
    isLoading: boolean;
}

export default function AdminUsersStats({
                                            totalUsers,
                                            adminCount,
                                            ownerCount,
                                            userCount,
                                            isRefreshing,
                                            isLoading,
                                        }: AdminUsersStatsProps) {
    const statsData = [
        {
            label: 'Total Users',
            value: totalUsers,
            color: 'gray.800',
            icon: null,
        },
        {
            label: 'Admins',
            value: adminCount,
            color: 'red.600',
            icon: FiShield,
            iconColor: 'red.500',
        },
        {
            label: 'Owners',
            value: ownerCount,
            color: 'purple.600',
            icon: null,
        },
        {
            label: 'Users',
            value: userCount,
            color: 'blue.600',
            icon: null,
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
            <Card.Body py={{ base: 2, sm: 3 }}>
                <Flex
                    justify="space-between"
                    align="center"
                    flexWrap="wrap"
                    gap={{ base: 2, sm: 3 }}
                >
                    <HStack
                        gap={{ base: 3, sm: 6 }}
                        flexWrap="wrap"
                        justify={{ base: 'center', sm: 'flex-start' }}
                        width={{ base: '100%', sm: 'auto' }}
                    >
                        {statsData.map((stat, index) => (
                            <Box key={stat.label}>
                                <Text
                                    fontSize={{ base: '11px', sm: 'xs' }}
                                    color="gray.500"
                                    textTransform="uppercase"
                                    fontWeight="semibold"
                                    letterSpacing="wider"
                                >
                                    {stat.icon && (
                                        <Icon
                                            as={stat.icon}
                                            mr={1}
                                            color={stat.iconColor}
                                            boxSize={{ base: 3, sm: 4 }}
                                        />
                                    )}
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
                        colorPalette={isRefreshing || isLoading ? 'purple' : 'green'}
                        variant="subtle"
                        fontSize={{ base: '9px', sm: 'xs' }}
                        px={{ base: 2, sm: 3 }}
                        py={{ base: 0.5, sm: 1 }}
                        borderRadius="full"
                        width={'auto'}
                        textAlign="center"
                    >
                        {isRefreshing || isLoading ? '🔄 Refreshing...' : '✓ Updated'}
                    </Badge>
                </Flex>
            </Card.Body>
        </Card.Root>
    );
}