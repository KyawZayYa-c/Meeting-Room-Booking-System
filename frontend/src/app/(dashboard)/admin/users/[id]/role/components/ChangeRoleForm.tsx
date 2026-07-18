'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Heading,
    VStack,
    Field,
    Button,
    HStack,
    Text,
    Card,
    Flex,
    Icon,
    Badge,
    Separator,
} from '@chakra-ui/react';
import { useUpdateUserRoleMutation } from '@/lib/features/user/userApiSlice';
import { toaster } from '@/components/ui/toaster';
import { FiUser, FiShield, FiCheckCircle, FiXCircle } from 'react-icons/fi';

interface ChangeRoleFormProps {
    userId: string;
    currentRole: string;
    userName: string;
    userEmail: string;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function ChangeRoleForm({
                                           userId,
                                           currentRole,
                                           userName,
                                           userEmail,
                                           onSuccess,
                                           onCancel,
                                       }: ChangeRoleFormProps) {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<string>(currentRole);
    const [updateRole, { isLoading }] = useUpdateUserRoleMutation();

    const handleSubmit = async () => {
        try {
            await updateRole({ id: userId, role: selectedRole }).unwrap();
            toaster.create({
                title: 'Role updated successfully',
                type: 'success',
            });
            if (onSuccess) {
                onSuccess();
            } else {
                router.push('/admin/users');
            }
        } catch (error: any) {
            toaster.create({
                title: error.data?.message || 'Failed to update role',
                type: 'error',
            });
        }
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin':
                return 'red';
            case 'owner':
                return 'purple';
            default:
                return 'blue';
        }
    };

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'admin':
                return FiShield;
            case 'owner':
                return FiUser;
            default:
                return FiUser;
        }
    };

    const roleOptions = [
        { value: 'user', label: 'User', color: 'blue' },
        { value: 'owner', label: 'Owner', color: 'purple' },
        { value: 'admin', label: 'Admin', color: 'red' },
    ];

    return (
        <Card.Root
            variant="outline"
            borderColor="gray.200"
            borderRadius="2xl"
            shadow="lg"
            bg="white"
            overflow="hidden"
        >
            <Card.Body p={{ base: 4, sm: 6 }}>
                <VStack gap={6} align="stretch">
                    {/* Form Header */}
                    <Box>
                        <HStack gap={3}>
                            <Icon as={FiShield} color="purple.500" boxSize={6} />
                            <Heading size={{ base: 'md', sm: 'lg' }} color="gray.800" fontWeight="bold">
                                Change Role
                            </Heading>
                        </HStack>
                        <Text fontSize="sm" color="gray.500" ml={{ base: 0, sm: 9 }} mt={1}>
                            Update user role permissions
                        </Text>
                    </Box>

                    <Separator borderColor="gray.200" />

                    {/* User Info */}
                    <Box bg="gray.50" p={4} borderRadius="xl">
                        <Flex align="center" gap={3} flexWrap="wrap">
                            <Box
                                bg={getRoleColor(currentRole) + '.100'}
                                p={2}
                                borderRadius="full"
                            >
                                <Icon
                                    as={getRoleIcon(currentRole)}
                                    color={getRoleColor(currentRole) + '.600'}
                                    boxSize={5}
                                />
                            </Box>
                            <Box flex="1">
                                <Text fontWeight="semibold" color="gray.700">
                                    {userName}
                                </Text>
                                <Text fontSize="sm" color="gray.500">
                                    {userEmail}
                                </Text>
                            </Box>
                            <Badge
                                colorPalette={getRoleColor(currentRole)}
                                variant="subtle"
                                fontSize="xs"
                                px={2}
                                py={0.5}
                                borderRadius="full"
                            >
                                Current: {currentRole}
                            </Badge>
                        </Flex>
                    </Box>

                    <Field.Root>
                        <Field.Label display="flex" alignItems="center" gap={2}>
                            <Icon as={FiShield} boxSize={4} />
                            New Role
                        </Field.Label>
                        <Box position="relative">
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    border: '2px solid #E2E8F0',
                                    fontSize: '16px',
                                    backgroundColor: 'white',
                                    color: 'black',
                                    appearance: 'auto',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#805AD5';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(128, 90, 213, 0.2)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#E2E8F0';
                                    e.target.style.boxShadow = 'none';
                                }}
                            >
                                {roleOptions.map((role) => (
                                    <option key={role.value} value={role.value}>
                                        {role.label}
                                    </option>
                                ))}
                            </select>
                        </Box>
                        <Text fontSize="xs" color="gray.400" mt={1}>
                            Select a role to assign to this user
                        </Text>
                    </Field.Root>

                    {/* Role Preview */}
                    <Box
                        bg={getRoleColor(selectedRole) + '.50'}
                        p={4}
                        borderRadius="xl"
                        border="1px"
                        borderColor={getRoleColor(selectedRole) + '.200'}
                    >
                        <HStack gap={2} mb={1} flexWrap="wrap">
                            <Icon as={FiCheckCircle} color={getRoleColor(selectedRole) + '.500'} />
                            <Text fontWeight="semibold" fontSize="sm" color={getRoleColor(selectedRole) + '.700'}>
                                New Role Preview
                            </Text>
                        </HStack>
                        <Flex align="center" gap={2} flexWrap="wrap">
                            <Badge
                                colorPalette={getRoleColor(selectedRole)}
                                variant="solid"
                                fontSize="sm"
                                px={3}
                                py={1}
                                borderRadius="full"
                            >
                                {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
                            </Badge>
                            <Text fontSize="sm" color="gray.500">
                                {selectedRole === 'admin' ? 'Full system access' :
                                    selectedRole === 'owner' ? 'Manage bookings and users' :
                                        'Basic user access'}
                            </Text>
                        </Flex>
                    </Box>

                    <Separator borderColor="gray.200" />

                    {/* Action Buttons */}
                    <HStack gap={4} width="full" flexWrap="wrap">
                        <Button
                            variant="outline"
                            size="lg"
                            flex="1"
                            minWidth={{ base: '100%', sm: 'auto' }}
                            onClick={() => {
                                if (onCancel) {
                                    onCancel();
                                } else {
                                    router.back();
                                }
                            }}
                            borderRadius="xl"
                            colorPalette="gray"
                            fontSize={{ base: '13px', sm: 'md' }}
                            _hover={{ bg: 'gray.100' }}
                            transition="all 0.2s"
                        >
                            <Icon as={FiXCircle} mr={2} />
                            Cancel
                        </Button>
                        <Button
                            colorPalette="purple"
                            size="lg"
                            flex="1"
                            minWidth={{ base: '100%', sm: 'auto' }}
                            onClick={handleSubmit}
                            loading={isLoading}
                            loadingText="Updating..."
                            borderRadius="xl"
                            shadow="md"
                            fontSize={{ base: '13px', sm: 'md' }}
                            _hover={{
                                transform: 'translateY(-2px)',
                                shadow: 'lg',
                                bg: 'purple.600'
                            }}
                            transition="all 0.2s"
                        >
                            <Icon as={FiCheckCircle} mr={2} />
                            Update Role
                        </Button>
                    </HStack>
                </VStack>
            </Card.Body>
        </Card.Root>
    );
}