'use client';

import { useRouter } from 'next/navigation';
import {
    Container,
    Box,
    VStack,
    Button,
    HStack,
    Icon,
    Badge,
    Card,
    Flex,
    Text,
} from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';
import CreateBookingForm from './components/CreateBookingForm';

export default function NewBookingPage() {
    const router = useRouter();

    return (
        <Box bg="gray.50" minH="100vh" py={8}>
            <Container maxW="lg" px={{ base: 4, md: 6 }}>
                <VStack align="stretch" gap={6}>
                    {/* Form */}
                    <CreateBookingForm
                        onSuccess={() => router.push('/bookings')}
                        onCancel={() => router.back()}
                    />

                    {/* Info Card */}
                    <Card.Root
                        variant="outline"
                        borderColor="gray.200"
                        borderRadius="2xl"
                        shadow="sm"
                        bg="white"
                    >
                        <Card.Body py={3}>
                            <Flex justify="space-between" align="center" flexWrap="wrap" gap={2}>
                                <Text fontSize="xs" color="gray.500">
                                    💡 Select a date and time for your meeting room booking
                                </Text>
                                <Badge colorPalette="gray" variant="subtle" fontSize="xs" px={2} py={0.5} borderRadius="full">
                                    Required fields *
                                </Badge>
                            </Flex>
                        </Card.Body>
                    </Card.Root>
                </VStack>
            </Container>
        </Box>
    );
}