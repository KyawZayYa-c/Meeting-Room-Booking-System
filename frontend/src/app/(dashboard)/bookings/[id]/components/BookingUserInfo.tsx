'use client';

import { Box, Flex, HStack, Text, Badge, Avatar, Icon } from '@chakra-ui/react';
import { FiMail } from 'react-icons/fi';

interface BookingUserInfoProps {
    userName: string;
    userEmail: string;
    userRole: string;
    isMine: boolean;
}

export default function BookingUserInfo({ userName, userEmail, userRole, isMine }: BookingUserInfoProps) {
    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin': return 'red';
            case 'owner': return 'purple';
            default: return 'gray';
        }
    };

    return (
        <Box
            p={4}
            borderRadius="xl"
            border="1px"
            borderColor="gray.200"
            bg="gray.50"
        >
            <Flex align="center" gap={4} flexWrap="wrap">
                <Avatar.Root size="lg">
                    <Avatar.Fallback
                        name={userName}
                        bg={isMine ? 'green.100' : 'blue.100'}
                        color={isMine ? 'green.600' : 'blue.600'}
                        fontWeight="bold"
                        fontSize="xl"
                    />
                </Avatar.Root>
                <Box flex="1">
                    <HStack gap={2} flexWrap="wrap">
                        <Text fontSize="lg" fontWeight="bold" color="gray.800">
                            {userName}
                        </Text>
                        <Badge
                            colorPalette={getRoleColor(userRole)}
                            variant="subtle"
                            fontSize="xs"
                            px={2}
                            py={0.5}
                            borderRadius="full"
                        >
                            {userRole}
                        </Badge>
                    </HStack>
                    <HStack gap={1} mt={0.5}>
                        <Icon as={FiMail} boxSize={3} color="gray.400" />
                        <Text fontSize="sm" color="gray.500">
                            {userEmail}
                        </Text>
                    </HStack>
                </Box>
                <Badge
                    colorPalette={isMine ? 'green' : 'blue'}
                    variant="solid"
                    fontSize="sm"
                    px={3}
                    py={1}
                    borderRadius="full"
                >
                    {isMine ? 'You' : 'Guest'}
                </Badge>
            </Flex>
        </Box>
    );
}