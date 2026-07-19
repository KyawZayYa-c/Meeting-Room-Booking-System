'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Box,
    Container,
    VStack,
    Heading,
    Field,
    Input,
    Button,
    Text,
    HStack,
    IconButton,
    Card,
    Icon,
    Separator,
} from '@chakra-ui/react';
import { FiArrowLeft, FiLock, FiKey, FiCheckCircle } from 'react-icons/fi';
import { ChangePasswordSchema, ChangePasswordFormData } from '@/lib/schemas/userSchema';
import { useChangePasswordMutation } from '@/lib/features/user/userApiSlice';
import { useAppSelector } from '@/lib/store/hooks';
import { toaster } from '@/components/ui/toaster';

export default function ChangePasswordPage() {
    const router = useRouter();
    const { user } = useAppSelector((state) => state.auth);
    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ChangePasswordFormData>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
    });

    const onSubmit = async (data: ChangePasswordFormData) => {
        const userId = user?.id || user?._id;

        if (!userId) {
            toaster.create({
                title: 'User ID is missing',
                type: 'error',
            });
            return;
        }

        try {
            await changePassword({
                id: userId,
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            }).unwrap();

            toaster.create({
                title: 'Password changed successfully! 🎉',
                type: 'success',
            });
            reset();
            router.push('/dashboard');
        } catch (error: any) {
            toaster.create({
                title: error.data?.message || 'Failed to change password',
                type: 'error',
            });
        }
    };

    return (
        <Box bg="gray.50" minH="100vh" display="flex" alignItems="center" py={8}>
            <Container maxW="lg" px={{ base: 4, md: 6 }}>
                <Card.Root
                    variant="outline"
                    borderColor="gray.200"
                    borderRadius="3xl"
                    shadow="lg"
                    bg="white"
                    overflow="hidden"
                >
                    {/* Header with Gradient */}
                    <Box
                        bgGradient="to-r"
                        gradientFrom="blue.500"
                        gradientTo="purple.600"
                        p={6}
                        textAlign="center"
                        position="relative"
                    >
                        {/* Back Button */}
                        <IconButton
                            aria-label="Go back"
                            variant="ghost"
                            onClick={() => router.back()}
                            position="absolute"
                            top={4}
                            left={4}
                            color="white"
                            _hover={{ bg: 'whiteAlpha.200' }}
                            borderRadius="full"
                            size="sm"
                        >
                            <Icon as={FiArrowLeft} boxSize={5} />
                        </IconButton>

                        <Box
                            bg="whiteAlpha.200"
                            borderRadius="full"
                            p={3}
                            display="inline-block"
                            mb={2}
                        >
                            <Icon as={FiKey} boxSize={7} color="white" />
                        </Box>
                        <Heading size="lg" color="white" fontWeight="bold" letterSpacing="tight">
                            Change Password
                        </Heading>
                        <Text color="whiteAlpha.800" fontSize="sm" mt={1}>
                            Secure your account with a new password
                        </Text>
                    </Box>

                    <Card.Body p={{ base: 4, md: 6 }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <VStack gap={5} align="stretch">
                                {/* Current Password */}
                                <Field.Root required invalid={!!errors.currentPassword}>
                                    <Field.Label display="flex" alignItems="center" gap={2} fontWeight="semibold" color="gray.700">
                                        <Icon as={FiLock} boxSize={4} color="gray.400" />
                                        Current Password
                                    </Field.Label>
                                    <Input
                                        type="password"
                                        placeholder="Enter your current password"
                                        size="lg"
                                        {...register('currentPassword')}
                                        bg="gray.50"
                                        borderColor="gray.200"
                                        _hover={{ borderColor: 'blue.400' }}
                                        _focus={{
                                            borderColor: 'blue.500',
                                            boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.2)',
                                            bg: 'white'
                                        }}
                                        transition="all 0.2s"
                                    />
                                    {errors.currentPassword && (
                                        <Field.ErrorText fontSize="sm" color="red.500">
                                            {errors.currentPassword.message}
                                        </Field.ErrorText>
                                    )}
                                </Field.Root>

                                <Separator borderColor="gray.200" />

                                {/* New Password */}
                                <Field.Root required invalid={!!errors.newPassword}>
                                    <Field.Label display="flex" alignItems="center" gap={2} fontWeight="semibold" color="gray.700">
                                        <Icon as={FiKey} boxSize={4} color="gray.400" />
                                        New Password
                                    </Field.Label>
                                    <Input
                                        type="password"
                                        placeholder="Enter new password (min 6 characters)"
                                        size="lg"
                                        {...register('newPassword')}
                                        bg="gray.50"
                                        borderColor="gray.200"
                                        _hover={{ borderColor: 'blue.400' }}
                                        _focus={{
                                            borderColor: 'blue.500',
                                            boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.2)',
                                            bg: 'white'
                                        }}
                                        transition="all 0.2s"
                                    />
                                    {errors.newPassword && (
                                        <Field.ErrorText fontSize="sm" color="red.500">
                                            {errors.newPassword.message}
                                        </Field.ErrorText>
                                    )}
                                </Field.Root>

                                {/* Confirm New Password */}
                                <Field.Root required invalid={!!errors.confirmNewPassword}>
                                    <Field.Label display="flex" alignItems="center" gap={2} fontWeight="semibold" color="gray.700">
                                        <Icon as={FiCheckCircle} boxSize={4} color="gray.400" />
                                        Confirm New Password
                                    </Field.Label>
                                    <Input
                                        type="password"
                                        placeholder="Confirm your new password"
                                        size="lg"
                                        {...register('confirmNewPassword')}
                                        bg="gray.50"
                                        borderColor="gray.200"
                                        _hover={{ borderColor: 'blue.400' }}
                                        _focus={{
                                            borderColor: 'blue.500',
                                            boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.2)',
                                            bg: 'white'
                                        }}
                                        transition="all 0.2s"
                                    />
                                    {errors.confirmNewPassword && (
                                        <Field.ErrorText fontSize="sm" color="red.500">
                                            {errors.confirmNewPassword.message}
                                        </Field.ErrorText>
                                    )}
                                </Field.Root>

                                <Button
                                    type="submit"
                                    colorPalette="blue"
                                    size="lg"
                                    width="full"
                                    mt={2}
                                    loading={isLoading}
                                    loadingText="Updating..."
                                    borderRadius="xl"
                                    shadow="md"
                                    _hover={{
                                        transform: 'translateY(-2px)',
                                        shadow: 'lg',
                                        bg: 'blue.600'
                                    }}
                                    transition="all 0.2s"
                                >
                                    <Icon as={FiKey} mr={2} />
                                    Update Password
                                </Button>
                            </VStack>
                        </form>

                        <Separator my={6} borderColor="gray.200" />

                        <Text textAlign="center" fontSize="xs" color="gray.400">
                            Your password must be at least 6 characters long
                        </Text>
                    </Card.Body>
                </Card.Root>
            </Container>
        </Box>
    );
}