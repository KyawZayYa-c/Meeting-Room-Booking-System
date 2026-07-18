'use client';

import { SimpleGrid, Card, CardBody, HStack, Box, VStack, Text, Heading } from '@chakra-ui/react';
import { User } from '@/lib/types';

interface StatsCardsProps {
    stats: {
        totalBookings: number;
        myBookings: number;
        users: User[];
        userRole: string;
    };
}

export default function StatsCards({ stats }: StatsCardsProps) {
    const { totalBookings, myBookings, users, userRole } = stats;

    const cardConfigs = [
        {
            label: 'Total Bookings',
            value: totalBookings,
            color: 'blue',
            icon: '📅',
            subtitle: 'All time bookings',
            show: true,
        },
        {
            label: 'My Bookings',
            value: myBookings,
            color: 'green',
            icon: '📋',
            subtitle: 'Your bookings',
            show: true,
        },
        {
            label: 'Total Users',
            value: users.length,
            color: 'purple',
            icon: '👥',
            subtitle: 'Registered users',
            show: userRole === 'admin',
        },
        {
            label: 'Admin / Owner',
            value: users.filter((u) => u.role === 'owner' || u.role === 'admin').length,
            color: 'orange',
            icon: '⭐',
            subtitle: 'Privileged users',
            show: userRole === 'admin' || userRole === 'owner',
        },
    ];

    const visibleCards = cardConfigs.filter((card) => card.show);

    return (
        <SimpleGrid columns={{ base: 1, sm: 2, md:3, lg: 4 }}  gap={6}>
            {visibleCards.map((card, index) => (
                <Card.Root
                    key={index}
                    shadow="md"
                    borderRadius="2xl"
                    bg="white"
                    _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
                    transition="all 0.3s"
                    border="1px"
                    borderColor="gray.100"
                >
                    <Card.Body p={6}>
                        <HStack gap={4}>
                            <Box
                                bg={`${card.color}.100`}
                                p={3}
                                borderRadius="xl"
                                fontSize="2xl"
                                minW="48px"
                                textAlign="center"
                            >
                                {card.icon}
                            </Box>
                            <Box>
                                <Text fontSize="sm" color="gray.500" fontWeight="medium">
                                    {card.label}
                                </Text>
                                <Heading size="2xl" color={`${card.color}.600`} lineHeight="1.2">
                                    {card.value}
                                </Heading>
                                <Text fontSize="xs" color="gray.400">
                                    {card.subtitle}
                                </Text>
                            </Box>
                        </HStack>
                    </Card.Body>
                </Card.Root>
            ))}
        </SimpleGrid>
    );
}