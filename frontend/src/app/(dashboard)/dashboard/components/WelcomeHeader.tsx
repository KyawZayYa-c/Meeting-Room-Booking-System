'use client';

import { useRouter } from 'next/navigation';
import { Box, Flex, VStack, Heading, Text, Badge, Button, HStack, Stack } from '@chakra-ui/react';
import { Avatar } from '@/components/ui/avatar';
import { User } from '@/lib/types';
import { formatDate, getRoleColor } from '@/utils/helpers';
import { FaCalendarAlt, FaUsers, FaClock, FaSignOutAlt, FaKey } from 'react-icons/fa';

interface WelcomeHeaderProps {
    user: User;
    onLogout?: () => void;
}

export default function WelcomeHeader({ user, onLogout }: WelcomeHeaderProps) {
    const router = useRouter();

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <Box
            position="relative"
            bgGradient="to-r"
            gradientFrom="blue.600"
            gradientTo="purple.600"
            p={{ base: 4, sm: 5, md: 6 }}
            borderRadius="xl"
            shadow="md"
            color="white"
            overflow="hidden"
        >
            <Flex
                justify="space-between"
                align={{ base: 'flex-start', sm: 'center' }}
                direction={{ base: 'column', sm: 'row' }}
                gap={4}
                width="100%"
            >
                {/* Left Side: Profile & Details */}
                <Flex align="center" gap={4} justify="flex-start">
                    <Avatar
                        size={{ base: 'lg', md: 'xl' }}
                        name={user.name}
                        border="2px solid"
                        borderColor="whiteAlpha.400"
                    />
                    <VStack align="start" gap={1}>
                        <Heading size={{ base: 'md', md: 'lg' }} fontWeight="bold" letterSpacing="tight">
                            {getGreeting()}, {user.name}! 👋
                        </Heading>

                        {/* Info Badges Row */}
                        <Flex flexWrap="wrap" gap={2.5} align="center">
                            <Badge
                                variant="solid"
                                colorPalette={getRoleColor(user.role)}
                                fontSize="10px"
                                px={2}
                                py={0.5}
                                borderRadius="md"
                                textTransform="uppercase"
                            >
                                {user.role}
                            </Badge>

                            <Flex align="center" gap={1} fontSize="xs" opacity={0.85}>
                                <FaCalendarAlt size={11} />
                                <Text>{formatDate(new Date().toISOString())}</Text>
                            </Flex>

                            <Flex align="center" gap={1} fontSize="xs" opacity={0.85}>
                                <FaClock size={11} />
                                <Text>
                                    {new Date().toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </Text>
                            </Flex>

                            {user.role === 'admin' && (
                                <Flex align="center" gap={1} fontSize="xs" opacity={0.85}>
                                    <FaUsers size={11} />
                                    <Text>Admin Mode</Text>
                                </Flex>
                            )}
                        </Flex>
                    </VStack>
                </Flex>

                {/* Right Side: Action Buttons */}
                <Stack
                    direction={{ base: 'row', sm: 'column', md: 'row' }}
                    gap={3}
                    align="center"
                    justify={{ base: 'flex-start', sm: 'flex-start', md: 'flex-end' }}
                >
                    {/* Change Password Button */}
                    <Button
                        onClick={() => router.push('/change-password')}
                        variant="outline"
                        colorScheme="white"
                        borderColor="whiteAlpha.400"
                        color="white"
                        size="sm"
                        borderRadius="lg"
                        fontWeight="semibold"
                        gap={2}
                        _hover={{ bg: 'whiteAlpha.300', borderColor: 'white' }}
                        height="36px"
                        px={4}
                        width={{  sm: '100%', md: 'auto' }}
                    >
                        <FaKey size={14} />
                        <Text>Change Password</Text>
                    </Button>

                    {/* Logout Button */}
                    <Button
                        onClick={onLogout}
                        variant="outline"
                        colorScheme="white"
                        borderColor="whiteAlpha.400"
                        color="white"
                        size="sm"
                        borderRadius="lg"
                        fontWeight="semibold"
                        gap={2}
                        _hover={{ bg: 'whiteAlpha.300', borderColor: 'white' }}
                        height="36px"
                        px={4}
                        width={{sm: '100%', md: 'auto' }}
                    >
                        <FaSignOutAlt size={14} />
                        <Text>Logout</Text>
                    </Button>
                </Stack>
            </Flex>
        </Box>
    );
}