'use client';

import { useEffect } from 'react';
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
    Link,
    Icon,
    Card,
    HStack,
} from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setUser, setError, setLoading } from '@/lib/store/slices/authSlice';
import { useLoginMutation } from '@/lib/features/auth/authApiSlice';
import { LoginSchema, LoginFormData } from '@/lib/schemas/authSchema';
import { FiMail, FiLock, FiLogIn, FiUser } from 'react-icons/fi';

export default function LoginPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [login, { isLoading }] = useLoginMutation();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    useEffect(() => {
        if (isAuthenticated && user) {
            router.push('/');
        }
    }, [isAuthenticated, user, router]);

    const onSubmit = async (data: LoginFormData) => {
        dispatch(setLoading(true));
        try {
            const res = await login(data).unwrap();
            dispatch(setUser(res.data.user));
            toaster.create({
                title: 'Welcome back! 🎉',
                type: 'success',
            });
            router.push('/dashboard');
        } catch (error: any) {
            const msg = error.data?.message || 'Login failed';
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
        <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" py={8}>
            <Container maxW="lg" px={{ base: 4, md: 6 }}>
                <Card.Root
                    variant="outline"
                    borderColor="gray.200"
                    borderRadius="3xl"
                    shadow="lg"
                    bg="white"
                    overflow="hidden"
                    position="relative"
                >
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push('/')}
                        borderRadius="full"
                        colorPalette="gray"
                        bg="gray.100"
                        _hover={{ bg: 'gray.200', transform: 'scale(0.95)' }}
                        transition="all 0.2s"
                        position="absolute"
                        top={4}
                        left={4}
                        px={2}
                        zIndex={10}
                    >
                        ← Back
                    </Button>

                    <Box
                        bgGradient="to-r"
                        gradientFrom="blue.500"
                        gradientTo="purple.600"
                        p={6}
                        textAlign="center"
                        borderBottom="1px"
                        borderColor="whiteAlpha.200"
                    >
                        <Box
                            bg="whiteAlpha.200"
                            borderRadius="full"
                            p={3}
                            display="inline-block"
                            mb={2}
                            _hover={{ bg: 'whiteAlpha.300' }}
                            transition="all 0.2s"
                        >
                            <Icon as={FiUser} boxSize={8} color="white" />
                        </Box>
                        <Heading size="lg" color="white" fontWeight="bold" letterSpacing="tight">
                            Welcome Back
                        </Heading>
                        <Text color="whiteAlpha.800" fontSize="sm" mt={1}>
                            Sign in to continue to your{' '}
                            <Text as="span" fontWeight="bold" color="white">
                                MEETING ROOM
                            </Text>
                        </Text>
                    </Box>

                    <Card.Body p={{ base: 6, md: 8 }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <VStack gap={5} align="stretch">
                                <Field.Root required invalid={!!errors.email}>
                                    <Field.Label display="flex" alignItems="center" gap={2} fontWeight="semibold" color="gray.700">
                                        <Icon as={FiMail} boxSize={4} color="gray.400" />
                                        Email Address
                                    </Field.Label>
                                    <Input
                                        type="email"
                                        placeholder="you@example.com"
                                        size="lg"
                                        {...register('email')}
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
                                    {errors.email && (
                                        <Field.ErrorText fontSize="sm" color="red.500">
                                            {errors.email.message}
                                        </Field.ErrorText>
                                    )}
                                </Field.Root>

                                <Field.Root required invalid={!!errors.password}>
                                    <Field.Label display="flex" alignItems="center" gap={2} fontWeight="semibold" color="gray.700">
                                        <Icon as={FiLock} boxSize={4} color="gray.400" />
                                        Password
                                    </Field.Label>
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        size="lg"
                                        {...register('password')}
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
                                    {errors.password && (
                                        <Field.ErrorText fontSize="sm" color="red.500">
                                            {errors.password.message}
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
                                    loadingText="Signing in..."
                                    borderRadius="xl"
                                    shadow="md"
                                    _hover={{
                                        transform: 'translateY(-2px)',
                                        shadow: 'lg',
                                        bg: 'blue.600'
                                    }}
                                    transition="all 0.2s"
                                >
                                    <Icon as={FiLogIn} mr={2} />
                                    Sign In
                                </Button>
                            </VStack>
                        </form>

                    </Card.Body>
                </Card.Root>

                <Text textAlign="center" fontSize="xs" color="gray.400" mt={4}>
                    By signing in, you agree to our Terms of Service
                </Text>
            </Container>
        </Box>
    );
}