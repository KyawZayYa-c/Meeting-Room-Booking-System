'use client';

import { useRouter } from 'next/navigation';
import { Box, Container, Heading, Text, VStack, Button, Stack } from '@chakra-ui/react';

export default function HomePage() {
    const router = useRouter();

    return (
        <Container maxW="container.lg" minH="100vh" py={20}>
            <Box
                bg="white"
                p={10}
                borderRadius="3xl"
                boxShadow="xl"
                textAlign="center"
                border="1px"
                borderColor="gray.100"
            >
                <VStack gap={8}>
                    <Box>
                        <Heading size="4xl" color="blue.600" letterSpacing="tight">
                            🏢 Meeting Room
                        </Heading>
                        <Heading size="xl" color="gray.600" fontWeight="medium" mt={2}>
                            Booking System
                        </Heading>
                    </Box>

                    <Text fontSize="xl" color="gray.600" maxW="lg">
                        Welcome to the Meeting Room Booking System. Please login or register to continue.
                    </Text>

                    <Stack direction={{ base: 'column', sm: 'row' }} gap={4} mt={4}>
                        <Button
                            size="lg"
                            colorScheme="blue"
                            px={12}
                            py={7}
                            borderRadius="xl"
                            fontSize="lg"
                            _hover={{ transform: 'translateY(-3px)', shadow: 'lg' }}
                            transition="all 0.2s"
                            onClick={() => router.push('/login')}
                        >
                            Sign In
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            colorScheme="blue"
                            px={12}
                            py={7}
                            borderRadius="xl"
                            fontSize="lg"
                            _hover={{ transform: 'translateY(-3px)', shadow: 'lg', bg: 'blue.50' }}
                            transition="all 0.2s"
                            onClick={() => router.push('/register')}
                        >
                            Create Account
                        </Button>
                    </Stack>

                    <Text fontSize="sm" color="gray.400" mt={4}>
                        🔒 Secure & Easy to use
                    </Text>
                </VStack>
            </Box>
        </Container>
    );
}