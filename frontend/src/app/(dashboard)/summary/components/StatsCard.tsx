'use client';

import { Box, Card, HStack, Heading, Text, Icon } from '@chakra-ui/react';

interface StatsCardProps {
    label: string;
    value: number | string;
    color: string;
    icon: any;
    iconBg: string;
    iconColor: string;
}

export default function StatsCard({ label, value, color, icon, iconBg, iconColor }: StatsCardProps) {
    return (
        <Card.Root
            variant="outline"
            borderColor="gray.200"
            borderRadius="2xl"
            shadow="sm"
            bg="white"
            _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
            transition="all 0.2s"
        >
            <Card.Body>
                <HStack justify="space-between" align="start">
                    <Box>
                        <Text fontSize={{ base: '10px', sm: 'sm' }} color="gray.500" fontWeight="semibold" textTransform="uppercase" letterSpacing="wider">
                            {label}
                        </Text>
                        <Heading size={{ base: 'xl', sm: '2xl' }} color={color} mt={1}>
                            {value}
                        </Heading>
                    </Box>
                    <Box bg={iconBg} p={2} borderRadius="full">
                        <Icon as={icon} boxSize={{ base: 4, sm: 5 }} color={iconColor} />
                    </Box>
                </HStack>
            </Card.Body>
        </Card.Root>
    );
}