'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Box,
    Heading,
    VStack,
    Field,
    Input,
    Button,
    HStack,
    Text,
    Card,
    Flex,
    Icon,
    Badge,
    Separator,
} from '@chakra-ui/react';
import { CreateUserSchema } from '@/lib/schemas/userSchema';
import { useCreateUserMutation } from '@/lib/features/user/userApiSlice';
import { toaster } from '@/components/ui/toaster';
import { FiUser, FiMail, FiLock, FiShield, FiCheckCircle, FiXCircle, FiUserPlus } from 'react-icons/fi';

interface CreateUserFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function CreateUserForm({ onSuccess, onCancel }: CreateUserFormProps) {
    const router = useRouter();
    const [createUser, { isLoading }] = useCreateUserMutation();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<any>({
        resolver: zodResolver(CreateUserSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            role: 'user',
        },
    });

    const selectedRole = watch('role');

    const onSubmit = async (data: any) => {
        try {
            await createUser({
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,
            }).unwrap();
            toaster.create({
                title: 'User created successfully! 🎉',
                type: 'success',
            });
            reset();
            if (onSuccess) {
                onSuccess();
            } else {
                router.push('/admin/users');
            }
        } catch (error: any) {
            toaster.create({
                title: error.data?.message || 'Failed to create user',
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

    const getRoleDescription = (role: string) => {
        switch (role) {
            case 'admin':
                return 'Full system access';
            case 'owner':
                return 'Manage bookings and users';
            default:
                return 'Basic user access';
        }
    };

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
                            <Icon as={FiUserPlus} color="purple.500" boxSize={6} />
                            <Heading size={{ base: 'md', sm: 'lg' }} color="gray.800" fontWeight="bold">
                                Create New User
                            </Heading>
                        </HStack>
                        <Text fontSize="sm" color="gray.500" ml={{ base: 0, sm: 9 }} mt={1}>
                            Fill in the details below to create a new user
                        </Text>
                    </Box>

                    <Separator borderColor="gray.200" />

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VStack gap={5} align="stretch">
                            {/* Name Field */}
                            <Field.Root required invalid={!!errors.name}>
                                <Field.Label display="flex" alignItems="center" gap={2}>
                                    <Icon as={FiUser} boxSize={4} />
                                    Name
                                </Field.Label>
                                <Input
                                    type="text"
                                    placeholder="Enter full name"
                                    size="lg"
                                    {...register('name')}
                                    bg="gray.50"
                                    borderColor="gray.200"
                                    _hover={{ borderColor: 'purple.400' }}
                                    _focus={{
                                        borderColor: 'purple.500',
                                        boxShadow: '0 0 0 3px rgba(128, 90, 213, 0.2)',
                                        bg: 'white'
                                    }}
                                    transition="all 0.2s"
                                />
                                {errors.name && (
                                    <Field.ErrorText>
                                        <Icon as={FiXCircle} mr={1} />
                                        {errors.name.message as string}
                                    </Field.ErrorText>
                                )}
                            </Field.Root>

                            {/* Email Field */}
                            <Field.Root required invalid={!!errors.email}>
                                <Field.Label display="flex" alignItems="center" gap={2}>
                                    <Icon as={FiMail} boxSize={4} />
                                    Email
                                </Field.Label>
                                <Input
                                    type="email"
                                    placeholder="Enter email address"
                                    size="lg"
                                    {...register('email')}
                                    bg="gray.50"
                                    borderColor="gray.200"
                                    _hover={{ borderColor: 'purple.400' }}
                                    _focus={{
                                        borderColor: 'purple.500',
                                        boxShadow: '0 0 0 3px rgba(128, 90, 213, 0.2)',
                                        bg: 'white'
                                    }}
                                    transition="all 0.2s"
                                />
                                {errors.email && (
                                    <Field.ErrorText>
                                        <Icon as={FiXCircle} mr={1} />
                                        {errors.email.message as string}
                                    </Field.ErrorText>
                                )}
                            </Field.Root>

                            {/* Password Field */}
                            <Field.Root required invalid={!!errors.password}>
                                <Field.Label display="flex" alignItems="center" gap={2}>
                                    <Icon as={FiLock} boxSize={4} />
                                    Password
                                </Field.Label>
                                <Input
                                    type="password"
                                    placeholder="Enter password (min 6 characters)"
                                    size="lg"
                                    {...register('password')}
                                    bg="gray.50"
                                    borderColor="gray.200"
                                    _hover={{ borderColor: 'purple.400' }}
                                    _focus={{
                                        borderColor: 'purple.500',
                                        boxShadow: '0 0 0 3px rgba(128, 90, 213, 0.2)',
                                        bg: 'white'
                                    }}
                                    transition="all 0.2s"
                                />
                                {errors.password && (
                                    <Field.ErrorText>
                                        <Icon as={FiXCircle} mr={1} />
                                        {errors.password.message as string}
                                    </Field.ErrorText>
                                )}
                            </Field.Root>

                            {/* Role Field */}
                            <Field.Root required>
                                <Field.Label display="flex" alignItems="center" gap={2}>
                                    <Icon as={FiShield} boxSize={4} />
                                    Role
                                </Field.Label>
                                <Box position="relative">
                                    <select
                                        value={selectedRole}
                                        onChange={(e) => setValue('role', e.target.value)}
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
                                        <option value="user">User</option>
                                        <option value="owner">Owner</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </Box>
                                <Text fontSize="xs" color="gray.400" mt={1}>
                                    Select a role for the new user
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
                                        Role Preview
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
                                        {getRoleDescription(selectedRole)}
                                    </Text>
                                </Flex>
                            </Box>

                            <Separator borderColor="gray.200" />

                            {/* Action Buttons */}
                            <HStack gap={4} width="full" flexWrap="wrap">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    fontSize={{ base: '13px', sm: 'md' }}
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
                                    _hover={{ bg: 'gray.100' }}
                                    transition="all 0.2s"
                                >
                                    <Icon as={FiXCircle} mr={2} />
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    colorPalette="purple"
                                    size="lg"
                                    fontSize={{ base: '13px', sm: 'md' }}
                                    flex="1"
                                    minWidth={{ base: '100%', sm: 'auto' }}
                                    loading={isLoading}
                                    loadingText="Creating..."
                                    borderRadius="xl"
                                    shadow="md"
                                    _hover={{
                                        transform: 'translateY(-2px)',
                                        shadow: 'lg',
                                        bg: 'purple.600'
                                    }}
                                    transition="all 0.2s"
                                >
                                    <Icon as={FiCheckCircle} mr={2} />
                                    Create User
                                </Button>
                            </HStack>
                        </VStack>
                    </form>
                </VStack>
            </Card.Body>
        </Card.Root>
    );
}