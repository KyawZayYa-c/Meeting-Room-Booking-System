'use client';

import { useRouter } from 'next/navigation';
import {
    Box,
    Container,
    Text,
    VStack,
    Button,
    Stack,
    Icon,
    Card,
} from '@chakra-ui/react';
import { FiLogIn } from 'react-icons/fi';
import HomeHero from "@/app/(dashboard)/homecomponents/HomeHero";
import HomeFeatures from "@/app/(dashboard)/homecomponents/HomeFeatures";
import HomeFooter from "@/app/(dashboard)/homecomponents/HomeFooter";

export default function HomeHeroPage() {
    const router = useRouter();

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
                    <HomeHero />

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

                            <HomeFeatures />

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

                            <HomeFooter />
                        </VStack>
                    </Card.Body>
                </Card.Root>

                <Text textAlign="center" fontSize={{ base: '9px', md: 'xs' }} color="gray.400" mt={4}>
                    © {new Date().getFullYear()} Meeting Room Booking System. All rights reserved.
                </Text>
            </Container>
        </Box>
    );
}