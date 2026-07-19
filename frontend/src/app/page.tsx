'use client';

import { useRouter } from 'next/navigation';
import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    Button,
    Stack,
    Icon,
    HStack,
    SimpleGrid,
    Card,
} from '@chakra-ui/react';
import { FiLogIn, FiCalendar, FiUsers, FiClock, FiCheckCircle } from 'react-icons/fi';

export default function HomePage() {
    const router = useRouter();

    const features = [
        { icon: FiCalendar, title: 'Easy Booking', description: 'Book meeting rooms in seconds' },
        { icon: FiUsers, title: 'Team Collaboration', description: 'Manage bookings with your team' },
        { icon: FiClock, title: 'Real-time Updates', description: 'See availability instantly' },
    ];

    return (
        <Box
            minH="100vh"
            py={{ base: 4, md: 5 }}
            bg="gray.50"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Container maxW="container.md" px={{ base: 4, md: 5 }}>
                <Card.Root
                    variant="outline"
                    borderColor="gray.200"
                    borderRadius="3xl"
                    shadow="xl"
                    bg="white"
                    overflow="hidden"
                >
                    {/* Hero Section with Gradient */}
                    <Box
                        bgGradient="to-r"
                        gradientFrom="blue.500"
                        gradientTo="purple.600"
                        p={{ base: 5, md: 10 }}
                        textAlign="center"
                        flexShrink={0}
                    >
                        <Box
                            bg="whiteAlpha.200"
                            borderRadius="full"
                            p={{ base: 2, md: 3 }}
                            display="inline-block"
                            mb={{ base: 2, md: 4 }}
                        >
                            <Icon as={FiCalendar} boxSize={{ base: 6, md: 8 }} color="white" />
                        </Box>
                        <Heading
                            size={{ base: 'xl', md: '4xl' }}
                            color="white"
                            fontWeight="bold"
                            letterSpacing="tight"
                        >
                            Meeting Room Booking
                        </Heading>
                        <Text
                            color="whiteAlpha.900"
                            fontSize={{ base: 'sm', md: 'xl' }}
                            fontWeight="medium"
                            mt={{ base: 1, md: 2 }}
                        >
                            Simplify Your Meeting Space Management
                        </Text>
                        <Box
                            w="60px"
                            h="2px"
                            bg="whiteAlpha.400"
                            borderRadius="full"
                            mx="auto"
                            mt={{ base: 2, md: 3 }}
                        />
                    </Box>

                    <Card.Body
                        p={{ base: 4, md: 8 }}
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        flex="1"
                    >
                        <VStack gap={{ base: 3, md: 6 }} align="stretch">
                            {/* Description */}
                            <Text
                                fontSize={{ base: 'xs', md: 'lg' }}
                                color="gray.600"
                                textAlign="center"
                                maxW="2xl"
                                mx="auto"
                                lineHeight={{ base: 'short', md: 'tall' }}
                            >
                                Welcome to the Meeting Room Booking System.
                                Easily manage, schedule, and track all your meeting room reservations
                                in one centralized platform.
                            </Text>

                            {/* Features Grid */}
                            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={{ base: 2, md: 4 }}>
                                {features.map((feature, index) => (
                                    <Box
                                        key={index}
                                        p={{ base: 2.5, md: 4 }}
                                        borderRadius="xl"
                                        border="1px"
                                        borderColor="gray.100"
                                        bg="gray.50"
                                        textAlign="center"
                                        _hover={{
                                            transform: { base: 'none', md: 'translateY(-4px)' },
                                            shadow: { base: 'none', md: 'md' },
                                            borderColor: 'blue.200',
                                            bg: 'white'
                                        }}
                                        transition="all 0.3s"
                                    >
                                        <Box
                                            bg="blue.50"
                                            borderRadius="full"
                                            p={{ base: 1, md: 2 }}
                                            display="inline-block"
                                            mb={{ base: 0.5, md: 2 }}
                                        >
                                            <Icon as={feature.icon} boxSize={{ base: 3.5, md: 5 }} color="blue.500" />
                                        </Box>
                                        <Heading size={{ base: 'xs', md: 'sm' }} color="gray.700" fontWeight="bold">
                                            {feature.title}
                                        </Heading>
                                        <Text fontSize={{ base: '9px', md: 'xs' }} color="gray.500" mt={0.5}>
                                            {feature.description}
                                        </Text>
                                    </Box>
                                ))}
                            </SimpleGrid>

                            {/* Action Buttons */}
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                gap={{ base: 2, md: 4 }}
                                justify="center"
                            >
                                <Button
                                    size={{ base: 'sm', md: 'lg' }}
                                    colorPalette="blue"
                                    px={{ base: 4, md: 8 }}
                                    borderRadius="xl"
                                    fontSize={{ base: 'xs', md: 'md' }}
                                    fontWeight="bold"
                                    shadow={{ base: 'sm', md: 'md' }}
                                    _hover={{
                                        transform: { base: 'none', md: 'translateY(-2px)' },
                                        shadow: { base: 'sm', md: 'lg' },
                                        bg: 'blue.600'
                                    }}
                                    transition="all 0.2s"
                                    onClick={() => router.push('/login')}
                                >
                                    <Icon as={FiLogIn} mr={2} boxSize={{ base: 3, md: 5 }} />
                                    Sign In
                                </Button>
                            </Stack>

                            {/* Footer Info */}
                            <HStack justify="center" gap={{ base: 2, md: 6 }} flexWrap="wrap">
                                <HStack gap={1}>
                                    <Icon as={FiCheckCircle} boxSize={{ base: 2, md: 3 }} color="green.500" />
                                    <Text fontSize={{ base: '8px', md: 'xs' }} color="gray.500">
                                        Secure & Encrypted
                                    </Text>
                                </HStack>
                                <HStack gap={1}>
                                    <Icon as={FiCheckCircle} boxSize={{ base: 2, md: 3 }} color="green.500" />
                                    <Text fontSize={{ base: '8px', md: 'xs' }} color="gray.500">
                                        Free to Use
                                    </Text>
                                </HStack>
                                <HStack gap={1}>
                                    <Icon as={FiCheckCircle} boxSize={{ base: 2, md: 3 }} color="green.500" />
                                    <Text fontSize={{ base: '8px', md: 'xs' }} color="gray.500">
                                        24/7 Access
                                    </Text>
                                </HStack>
                            </HStack>
                        </VStack>
                    </Card.Body>
                </Card.Root>

                {/* Footer */}
                <Text textAlign="center" fontSize={{ base: '9px', md: 'xs' }} color="gray.400" mt={4}>
                    © {new Date().getFullYear()} Meeting Room Booking System. All rights reserved.
                </Text>
            </Container>
        </Box>
    );
}