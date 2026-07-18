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
import CreateUserForm from './components/CreateUserForm';

export default function NewUserPage() {
    const router = useRouter();

    return (
        <Box bg="gray.50" minH="100vh" py={4}>
            <Container maxW="lg" px={{ base: 4, md: 6 }}>
                <VStack align="stretch" gap={6}>
                    {/* Form */}
                    <CreateUserForm
                        onSuccess={() => router.push('/admin/users')}
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
                                    💡 Creating a new user will send them a welcome email with login credentials
                                </Text>
                                <Badge colorPalette="gray" variant="subtle" fontSize="xs" px={2} py={0.5} borderRadius="full">
                                    Admin only
                                </Badge>
                            </Flex>
                        </Card.Body>
                    </Card.Root>
                </VStack>
            </Container>
        </Box>
    );
}