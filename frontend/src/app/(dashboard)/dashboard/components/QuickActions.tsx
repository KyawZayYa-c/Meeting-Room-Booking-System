'use client';

import { useRouter } from 'next/navigation';
import { Box, Heading, SimpleGrid, Card, CardBody, HStack, Text } from '@chakra-ui/react';

interface QuickActionsProps {
    userRole: string;
}

export default function QuickActions({ userRole }: QuickActionsProps) {
    const router = useRouter();

    const actions = [
        {
            label: 'Bookings',
            icon: '📅',
            description: 'View & manage bookings',
            color: 'blue',
            onClick: () => router.push('/bookings'),
            show: true,
        },
        {
            label: 'Users',
            icon: '👥',
            description: 'Manage users',
            color: 'purple',
            onClick: () => router.push('/admin/users'),
            show: userRole === 'admin',
        },
        {
            label: 'Summary',
            icon: '📊',
            description: 'View reports',
            color: 'green',
            onClick: () => router.push('/summary'),
            show: userRole === 'admin' || userRole === 'owner',
        },
    ];

    const visibleActions = actions.filter((action) => action.show);

    return (
        <Box>
            <Heading size="md" mb={4} color="gray.700">
                🚀 Quick Actions
            </Heading>
            <SimpleGrid columns={{ base: 1, sm: 2, md:3 }} gap={4}>
                {visibleActions.map((action, index) => (
                    <Card.Root
                        key={index}
                        shadow="md"
                        borderRadius="2xl"
                        cursor="pointer"
                        _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
                        transition="all 0.3s"
                        onClick={action.onClick}
                        bg={`${action.color}.50`}
                        border="1px"
                        borderColor={`${action.color}.200`}
                    >
                        <Card.Body p={5}>
                            <HStack gap={4}>
                                <Box fontSize="2xl">{action.icon}</Box>
                                <Box>
                                    <Heading size="sm" color="gray.700">
                                        {action.label}
                                    </Heading>
                                    <Text fontSize="sm" color="gray.500">
                                        {action.description}
                                    </Text>
                                </Box>
                            </HStack>
                        </Card.Body>
                    </Card.Root>
                ))}
            </SimpleGrid>
        </Box>
    );
}