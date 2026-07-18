'use client';

import { Box, Button, Card, Flex, HStack, Heading, Icon, Text, Badge } from '@chakra-ui/react';
import { FiArrowLeft, FiPlus, FiRefreshCw, FiUsers } from 'react-icons/fi';

interface AdminUsersHeaderProps {
    usersCount: number;
    onRefresh: () => void;
    isRefreshing: boolean;
    isLoading: boolean;
    onBack: () => void;
    onNewUser: () => void;
}

export default function AdminUsersHeader({
                                             usersCount,
                                             onRefresh,
                                             isRefreshing,
                                             isLoading,
                                             onBack,
                                             onNewUser,
                                         }: AdminUsersHeaderProps) {
    return (
        <Card.Root
            variant="outline"
            borderColor="gray.200"
            borderRadius="2xl"
            shadow="sm"
            bg="white"
        >
            <Card.Body py={4}>
                <Flex
                    justify="space-between"
                    align="center"
                    flexWrap="wrap"
                    gap={4}
                >
                    {/* Left side: Back + Title */}
                    <HStack gap={3}>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onBack}
                            borderRadius="full"
                            colorPalette="gray"
                            _hover={{ bg: 'gray.100', transform: 'scale(0.95)' }}
                            transition="all 0.2s"
                            flexShrink={0}
                        >
                            <Icon as={FiArrowLeft} />
                        </Button>
                        <Box>
                            <HStack gap={2}>
                                <Icon as={FiUsers} color="purple.500" boxSize={5} />
                                <Heading size="lg" color="gray.800" fontWeight="bold">
                                    Users
                                </Heading>
                                <Badge
                                    colorPalette="gray"
                                    variant="subtle"
                                    fontSize="xs"
                                    px={2}
                                    py={0.5}
                                    borderRadius="full"
                                    ml={1}
                                >
                                    {usersCount}
                                </Badge>
                            </HStack>
                            <Text fontSize="sm" color="gray.500" ml={7}>
                                Manage all users in the system
                            </Text>
                        </Box>
                    </HStack>

                    {/* Right side: Refresh + New User */}
                    <HStack gap={3} flexShrink={0}>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onRefresh}
                            borderRadius="full"
                            colorPalette="purple"
                            _hover={{ bg: 'purple.50' }}
                            loading={isRefreshing || isLoading}
                            loadingText="Refreshing"
                        >
                            <Icon
                                as={FiRefreshCw}
                                animation={isRefreshing || isLoading ? 'spin 1s linear infinite' : 'none'}
                            />
                            Refresh
                        </Button>
                        <Button
                            colorPalette="purple"
                            onClick={onNewUser}
                            size="lg"
                            borderRadius="xl"
                            shadow="md"
                            _hover={{
                                transform: 'translateY(-2px)',
                                shadow: 'lg',
                                bg: 'purple.600'
                            }}
                            transition="all 0.2s"
                        >
                            <Icon as={FiPlus} />
                            New User
                        </Button>
                    </HStack>
                </Flex>
            </Card.Body>
        </Card.Root>
    );
}