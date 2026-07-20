'use client';

import { useRouter } from 'next/navigation';
import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    Button,
    Icon,
    HStack,
    Card,
} from '@chakra-ui/react';
import { FiHome, FiArrowLeft, FiAlertCircle } from 'react-icons/fi';

export default function NotFound() {
    const router = useRouter();

    return (
        <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center" py={8}>
            <Container maxW="lg" px={{ base: 4, md: 6 }}>
                <Card.Root
                    variant="outline"
                    borderColor="gray.200"
                    borderRadius="3xl"
                    shadow="xl"
                    bg="white"
                    overflow="hidden"
                    position="relative"
                >
                    {/* Decorative Top Bar */}
                    <Box
                        h="4px"
                        bgGradient="to-r"
                        gradientFrom="blue.500"
                        gradientTo="purple.600"
                    />

                    <Card.Body p={{ base: 6, md: 10 }}>
                        <VStack gap={6}>
                            <Box
                                bgGradient="to-r"
                                gradientFrom="blue.500"
                                gradientTo="purple.600"
                                borderRadius="full"
                                p={{ base: 4, md: 6 }}
                                display="inline-block"
                                shadow="lg"
                            >
                                <Text
                                    fontSize={{ base: '5xl', md: '7xl' }}
                                    fontWeight="bold"
                                    color="white"
                                    letterSpacing="tight"
                                >
                                    404
                                </Text>
                            </Box>

                            <VStack gap={2}>
                                <Heading
                                    size={{ base: 'lg', md: 'xl' }}
                                    color="gray.800"
                                    fontWeight="bold"
                                >
                                    Oops! Page Not Found
                                </Heading>
                                <Text
                                    color="gray.500"
                                    fontSize={{ base: 'sm', md: 'md' }}
                                    textAlign="center"
                                    maxW="sm"
                                >
                                    The page you are looking for doesn't exist or has been moved.
                                </Text>
                            </VStack>

                            <Box
                                w="60px"
                                h="2px"
                                bgGradient="to-r"
                                gradientFrom="blue.400"
                                gradientTo="purple.400"
                                borderRadius="full"
                            />

                            <HStack
                                gap={4}
                                pt={2}
                                flexWrap="wrap"
                                justify="center"
                                direction={{ base: 'column', sm: 'row' }}
                                width="full"
                            >
                                <Button
                                    colorPalette="blue"
                                    size={{ base: 'md', md: 'lg' }}
                                    borderRadius="xl"
                                    px={{ base: 6, md: 8 }}
                                    width={{ base: 'full', sm: 'auto' }}
                                    _hover={{
                                        transform: 'translateY(-2px)',
                                        shadow: 'lg',
                                        bg: 'blue.600'
                                    }}
                                    transition="all 0.2s"
                                    onClick={() => router.push('/')}
                                >
                                    <Icon as={FiHome} mr={2} boxSize={{ base: 4, md: 5 }} />
                                    Go Home
                                </Button>
                                <Button
                                    variant="outline"
                                    colorPalette="gray"
                                    size={{ base: 'md', md: 'lg' }}
                                    borderRadius="xl"
                                    px={{ base: 6, md: 8 }}
                                    width={{ base: 'full', sm: 'auto' }}
                                    _hover={{
                                        transform: 'translateY(-2px)',
                                        shadow: 'lg',
                                        bg: 'gray.100'
                                    }}
                                    transition="all 0.2s"
                                    onClick={() => router.back()}
                                >
                                    <Icon as={FiArrowLeft} mr={2} boxSize={{ base: 4, md: 5 }} />
                                    Go Back
                                </Button>
                            </HStack>

                            {/* Footer */}
                            <Text
                                fontSize={{ base: '10px', md: 'xs' }}
                                color="gray.400"
                                pt={2}
                            >
                                © {new Date().getFullYear()} Meeting Room Booking System
                            </Text>
                        </VStack>
                    </Card.Body>
                </Card.Root>
            </Container>
        </Box>
    );
}