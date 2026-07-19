'use client';

import { Box , HStack, Avatar, Badge, Text, Icon, Flex } from '@chakra-ui/react';
import { FiMail, FiBookOpen } from 'react-icons/fi';

interface GroupedBookingCardProps {
    group: any;
}

export default function GroupedBookingCard({ group }: GroupedBookingCardProps) {
    return (
        <Box
            bg="gray.50"
            px={{ base: 4, sm: 6 }}
            py={{ base: 3, sm: 4 }}
            borderBottom="1px"
            borderColor="gray.200"
        >
            <Flex
                justify="space-between"
                align="center"
                flexWrap="wrap"
                gap={{ base: 2, sm: 3 }}
            >
                <HStack gap={{ base: 3, sm: 4 }}>
                    <Avatar.Root size={{ base: 'sm', sm: 'md' }}>
                        <Avatar.Fallback
                            name={group.userName}
                            bg="blue.100"
                            color="blue.600"
                            fontWeight="bold"
                            fontSize={{ base: 'xs', sm: 'md' }}
                        />
                    </Avatar.Root>
                    <Box>
                        <HStack gap={2} flexWrap="wrap">
                            <Text fontWeight="bold" fontSize={{ base: 'sm', sm: 'lg' }} color="gray.800">
                                {group.userName}
                            </Text>
                            <Badge
                                colorPalette={group.userRole === 'admin' ? 'red' : group.userRole === 'owner' ? 'purple' : 'blue'}
                                variant="subtle"
                                fontSize={{ base: '9px', sm: 'xs' }}
                                px={{ base: 1.5, sm: 2 }}
                                py={{ base: 0.5, sm: 0.5 }}
                                borderRadius="full"
                            >
                                {group.userRole}
                            </Badge>
                        </HStack>
                        <HStack gap={1.5} mt={0.5}>
                            <Icon as={FiMail} boxSize={{ base: 2.5, sm: 3 }} color="gray.400" />
                            <Text fontSize={{ base: '10px', sm: 'sm' }} color="gray.500">
                                {group.userEmail}
                            </Text>
                        </HStack>
                    </Box>
                </HStack>

                <Badge
                    colorPalette="blue"
                    variant="solid"
                    fontSize={{ base: '10px', sm: 'sm' }}
                    px={{ base: 2, sm: 4 }}
                    py={{ base: 1, sm: 1.5 }}
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    gap={1.5}
                >
                    <Icon as={FiBookOpen} boxSize={{ base: 2.5, sm: 3 }} />
                    {group.totalBookings} bookings
                </Badge>
            </Flex>
        </Box>
    );
}