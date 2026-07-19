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
} from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
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
        <Container maxW="md" py={8}>
            <Box bg="white" p={8} borderRadius="2xl" boxShadow="xl">
                <VStack gap={6}>
                    {/* Back Button & Title */}
                    <HStack width="full" justify="space-between">
                        <IconButton
                            aria-label="Go back"
                            variant="ghost"
                            onClick={() => router.back()}
                        >
                            <FaArrowLeft />
                        </IconButton>
                        <Heading size="xl" flex={1} textAlign="center">
                            Change Password
                        </Heading>
                        <Box w="40px" /> {/* Spacer for alignment */}
                    </HStack>

                    <Text fontSize="sm" color="gray.500">
                        Enter your current password and choose a new one
                    </Text>

                    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                        <VStack gap={4}>
                            <Field.Root required invalid={!!errors.currentPassword}>
                                <Field.Label>Current Password</Field.Label>
                                <Input
                                    type="password"
                                    placeholder="Enter current password"
                                    size="lg"
                                    {...register('currentPassword')}
                                    _focus={{ borderColor: 'blue.500', boxShadow: 'outline' }}
                                />
                                {errors.currentPassword && (
                                    <Field.ErrorText>{errors.currentPassword.message}</Field.ErrorText>
                                )}
                            </Field.Root>

                            <Field.Root required invalid={!!errors.newPassword}>
                                <Field.Label>New Password</Field.Label>
                                <Input
                                    type="password"
                                    placeholder="Enter new password (min 6 characters)"
                                    size="lg"
                                    {...register('newPassword')}
                                    _focus={{ borderColor: 'blue.500', boxShadow: 'outline' }}
                                />
                                {errors.newPassword && (
                                    <Field.ErrorText>{errors.newPassword.message}</Field.ErrorText>
                                )}
                            </Field.Root>

                            <Field.Root required invalid={!!errors.confirmNewPassword}>
                                <Field.Label>Confirm New Password</Field.Label>
                                <Input
                                    type="password"
                                    placeholder="Confirm new password"
                                    size="lg"
                                    {...register('confirmNewPassword')}
                                    _focus={{ borderColor: 'blue.500', boxShadow: 'outline' }}
                                />
                                {errors.confirmNewPassword && (
                                    <Field.ErrorText>{errors.confirmNewPassword.message}</Field.ErrorText>
                                )}
                            </Field.Root>

                            <Button
                                type="submit"
                                colorScheme="blue"
                                size="lg"
                                width="full"
                                mt={4}
                                loading={isLoading}
                                borderRadius="xl"
                                _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                                transition="all 0.2s"
                            >
                                Update Password
                            </Button>
                        </VStack>
                    </form>
                </VStack>
            </Box>
        </Container>
    );
}