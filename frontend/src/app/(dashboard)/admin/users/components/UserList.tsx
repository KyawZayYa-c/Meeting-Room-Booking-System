'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Table,
    Badge,
    Button,
    HStack,
    Text,
    Avatar,
    Card,
    Icon,
    Menu,
    Portal,
} from '@chakra-ui/react';
import { User } from '@/lib/types';
import { getRoleColor } from '@/utils/helpers';
import {
    FiUser,
    FiMail,
    FiShield,
    FiMoreVertical,
    FiEdit2,
    FiTrash2,
    FiCheckCircle,
    FiXCircle
} from 'react-icons/fi';

interface UserListProps {
    users: User[];
    currentUserId: string;
    onDelete: (id: string) => void;
    isDeleting: boolean;
    onRefresh: () => void;
}

export default function UserList({
                                     users,
                                     currentUserId,
                                     onDelete,
                                     isDeleting,
                                 }: UserListProps) {
    const router = useRouter();

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    if (users.length === 0) {
        return (
            <Card.Root
                variant="outline"
                borderColor="gray.200"
                bg="gray.50"
                borderRadius="2xl"
                borderStyle="dashed"
                borderWidth="2px"
            >
                <Card.Body py={16} textAlign="center">
                    <Box fontSize="5xl" mb={4}>👥</Box>
                    <Text fontSize="lg" fontWeight="semibold" color="gray.600">
                        No users found
                    </Text>
                    <Text fontSize="sm" color="gray.400" mt={1}>
                        Click "New User" to create your first user
                    </Text>
                </Card.Body>
            </Card.Root>
        );
    }

    return (
        <Card.Root
            variant="outline"
            borderColor="gray.100"
            borderRadius="2xl"
            overflow="hidden"
            shadow="sm"
        >
            <Box overflowX="auto">
                <Table.Root variant="outline" bg="white" minWidth="700px">
                    <Table.Header>
                        <Table.Row bg="gray.50">
                            <Table.ColumnHeader
                                fontWeight="semibold"
                                fontSize="xs"
                                textTransform="uppercase"
                                letterSpacing="wider"
                                minWidth="180px"
                            >
                                <HStack gap={2}>
                                    <Icon as={FiUser} boxSize={4} />
                                    <Text>User</Text>
                                </HStack>
                            </Table.ColumnHeader>
                            <Table.ColumnHeader
                                fontWeight="semibold"
                                fontSize="xs"
                                textTransform="uppercase"
                                letterSpacing="wider"
                                minWidth="200px"
                            >
                                <HStack gap={2}>
                                    <Icon as={FiMail} boxSize={4} />
                                    <Text>Email</Text>
                                </HStack>
                            </Table.ColumnHeader>
                            <Table.ColumnHeader
                                fontWeight="semibold"
                                fontSize="xs"
                                textTransform="uppercase"
                                letterSpacing="wider"
                                minWidth="120px"
                            >
                                <HStack gap={2}>
                                    <Icon as={FiShield} boxSize={4} />
                                    <Text>Role</Text>
                                </HStack>
                            </Table.ColumnHeader>
                            <Table.ColumnHeader
                                fontWeight="semibold"
                                fontSize="xs"
                                textTransform="uppercase"
                                letterSpacing="wider"
                                minWidth="100px"
                            >
                                Status
                            </Table.ColumnHeader>
                            <Table.ColumnHeader
                                textAlign="center"
                                fontWeight="semibold"
                                fontSize="xs"
                                textTransform="uppercase"
                                letterSpacing="wider"
                                minWidth="100px"
                            >
                                Actions
                            </Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {users.map((user) => {
                            const userId = user._id || user.id || '';
                            const isCurrentUser = userId === currentUserId;

                            return (
                                <Table.Row
                                    key={userId}
                                    _hover={{ bg: 'gray.50' }}
                                    transition="all 0.2s"
                                >
                                    <Table.Cell>
                                        <HStack gap={3}>
                                            <Avatar.Root size="sm">
                                                <Avatar.Fallback
                                                    bg={isCurrentUser ? 'purple.100' : 'blue.50'}
                                                    color={isCurrentUser ? 'purple.600' : 'blue.600'}
                                                    fontWeight="bold"
                                                    fontSize="xs"
                                                >
                                                    {getInitials(user.name)}
                                                </Avatar.Fallback>
                                            </Avatar.Root>
                                            <Box>
                                                <Text fontWeight="medium" fontSize="sm" color="gray.700">
                                                    {user.name}
                                                </Text>
                                                {isCurrentUser && (
                                                    <Badge
                                                        colorPalette="purple"
                                                        variant="solid"
                                                        fontSize="9px"
                                                        px={2}
                                                        py={0.5}
                                                        borderRadius="full"
                                                        mt={0.5}
                                                        display="inline-block"
                                                    >
                                                        You
                                                    </Badge>
                                                )}
                                            </Box>
                                        </HStack>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Text fontSize="sm" color="gray.600">
                                            {user.email}
                                        </Text>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Badge
                                            colorPalette={getRoleColor(user.role)}
                                            variant="subtle"
                                            fontSize="xs"
                                            px={3}
                                            py={1}
                                            borderRadius="full"
                                            textTransform="capitalize"
                                        >
                                            {user.role}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Badge
                                            colorPalette={user.role === 'admin' ? 'red' : 'green'}
                                            variant="subtle"
                                            fontSize="xs"
                                            px={3}
                                            py={1}
                                            borderRadius="full"
                                        >
                                            <HStack gap={1}>
                                                <Icon
                                                    as={user.role === 'admin' ? FiXCircle : FiCheckCircle}
                                                    boxSize={3}
                                                />
                                                <Text>{user.role === 'admin' ? 'Admin' : 'Active'}</Text>
                                            </HStack>
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell textAlign="center">
                                        {!isCurrentUser ? (
                                            <Menu.Root>
                                                <Menu.Trigger asChild>
                                                    <Button
                                                        size="xs"
                                                        variant="ghost"
                                                        borderRadius="full"
                                                        _hover={{ bg: 'gray.100' }}
                                                    >
                                                        <Icon as={FiMoreVertical} boxSize={4} />
                                                    </Button>
                                                </Menu.Trigger>
                                                <Portal>
                                                    <Menu.Positioner>
                                                        <Menu.Content
                                                            width="200px"
                                                            shadow="lg"
                                                            borderRadius="xl"
                                                            border="1px"
                                                            borderColor="gray.200"
                                                            bg="white"
                                                            zIndex={1000}
                                                        >
                                                            <Menu.Item
                                                                value="change-role"
                                                                onClick={() => router.push(`/admin/users/${userId}/role`)}
                                                                _hover={{ bg: 'blue.50' }}
                                                                borderRadius="md"
                                                            >
                                                                <Icon as={FiEdit2} mr={2} color="blue.500" boxSize={4} />
                                                                <Text>Change Role</Text>
                                                            </Menu.Item>
                                                            <Menu.Item
                                                                value="delete"
                                                                onClick={() => onDelete(userId)}
                                                                _hover={{ bg: 'red.50' }}
                                                                borderRadius="md"
                                                                color="red.500"
                                                            >
                                                                <Icon as={FiTrash2} mr={2} boxSize={4} />
                                                                <Text>Delete User</Text>
                                                            </Menu.Item>
                                                        </Menu.Content>
                                                    </Menu.Positioner>
                                                </Portal>
                                            </Menu.Root>
                                        ) : (
                                            <Badge
                                                colorPalette="gray"
                                                variant="subtle"
                                                fontSize="10px"
                                                px={3}
                                                py={1}
                                                borderRadius="full"
                                            >
                                                Current User
                                            </Badge>
                                        )}
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table.Root>
            </Box>
        </Card.Root>
    );
}