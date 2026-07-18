'use client';

import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
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
    Link,
    Stack,
} from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import { useAppDispatch } from '@/lib/store/hooks';
import { setUser, setError, setLoading } from '@/lib/store/slices/authSlice';
import { useRegisterMutation } from '@/lib/features/auth/authApiSlice';
import { RegisterSchema, RegisterFormData } from '@/lib/schemas/authSchema';

export default function RegisterPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [register, { isLoading }] = useRegisterMutation();

    const {
        register: registerField,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        dispatch(setLoading(true));
        try {
            const { confirmPassword, ...registerData } = data;
            const res = await register(registerData).unwrap();
            dispatch(setUser({ user: res.data.user, token: res.data.token }));
            toaster.create({
                title: 'Account created! 🎉',
                type: 'success',
            });
            router.push('/dashboard');
        } catch (error: any) {
            const msg = error.data?.message || 'Registration failed';
            dispatch(setError(msg));
            toaster.create({
                title: msg,
                type: 'error',
            });
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <Container maxW="lg" minH="100vh" py={12} display="flex" alignItems="center">
            <Box bg="white" p={8} borderRadius="2xl" boxShadow="xl" width="full">
                <VStack gap={8} align="center">
                    {/* Logo / Project Name */}
                    <VStack gap={1}>
                        <Heading size="2xl" color="blue.600" letterSpacing="tight">
                            🏢 Meeting Room
                        </Heading>
                        <Text color="gray.500" fontSize="sm" fontWeight="medium">
                            Create your account to get started
                        </Text>
                    </VStack>

                    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                        <Stack gap={4}>
                            <Field.Root required invalid={!!errors.name}>
                                <Field.Label fontWeight="medium">Full Name</Field.Label>
                                <Input
                                    type="text"
                                    placeholder="Enter your name"
                                    size="lg"
                                    {...registerField('name')}
                                    _focus={{ borderColor: 'blue.500', boxShadow: 'outline' }}
                                />
                                {errors.name && (
                                    <Field.ErrorText>{errors.name.message}</Field.ErrorText>
                                )}
                            </Field.Root>

                            <Field.Root required invalid={!!errors.email}>
                                <Field.Label fontWeight="medium">Email Address</Field.Label>
                                <Input
                                    type="email"
                                    placeholder="you@example.com"
                                    size="lg"
                                    {...registerField('email')}
                                    _focus={{ borderColor: 'blue.500', boxShadow: 'outline' }}
                                />
                                {errors.email && (
                                    <Field.ErrorText>{errors.email.message}</Field.ErrorText>
                                )}
                            </Field.Root>

                            <Field.Root required invalid={!!errors.password}>
                                <Field.Label fontWeight="medium">Password</Field.Label>
                                <Input
                                    type="password"
                                    placeholder="Create a password"
                                    size="lg"
                                    {...registerField('password')}
                                    _focus={{ borderColor: 'blue.500', boxShadow: 'outline' }}
                                />
                                {errors.password && (
                                    <Field.ErrorText>{errors.password.message}</Field.ErrorText>
                                )}
                            </Field.Root>

                            <Field.Root required invalid={!!errors.confirmPassword}>
                                <Field.Label fontWeight="medium">Confirm Password</Field.Label>
                                <Input
                                    type="password"
                                    placeholder="Confirm your password"
                                    size="lg"
                                    {...registerField('confirmPassword')}
                                    _focus={{ borderColor: 'blue.500', boxShadow: 'outline' }}
                                />
                                {errors.confirmPassword && (
                                    <Field.ErrorText>{errors.confirmPassword.message}</Field.ErrorText>
                                )}
                            </Field.Root>

                            <Button
                                type="submit"
                                colorScheme="blue"
                                size="lg"
                                width="full"
                                mt={2}
                                loading={isLoading}
                                borderRadius="xl"
                                _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                                transition="all 0.2s"
                            >
                                Create Account
                            </Button>
                        </Stack>
                    </form>

                    <Text fontSize="sm" color="gray.600">
                        Already have an account?{' '}
                        <Link as={NextLink} href="/login" color="blue.600" fontWeight="semibold">
                            Sign In
                        </Link>
                    </Text>
                </VStack>
            </Box>
        </Container>
    );
}