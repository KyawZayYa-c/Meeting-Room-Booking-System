'use client';

import { useRouter, useParams } from 'next/navigation';
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
    Spinner,
    Heading,
} from '@chakra-ui/react';
import { FiArrowLeft, FiXCircle } from 'react-icons/fi';
import { useGetAllUsersQuery } from '@/lib/features/user/userApiSlice';
import ChangeRoleForm from './components/ChangeRoleForm';

export default function ChangeRolePage() {
    const router = useRouter();
    const params = useParams();
    const userId = params.id as string;
    const { data, isLoading: isLoadingUser } = useGetAllUsersQuery();

    const user = data?.data?.users.find((u) => (u._id || u.id) === userId);

    if (isLoadingUser) {
        return (
            <Box bg="gray.50" minH="100vh" py={8}>
                <Container maxW="md" py={20} textAlign="center">
                    <Card.Root
                        variant="outline"
                        borderColor="gray.200"
                        borderRadius="2xl"
                        shadow="sm"
                        bg="white"
                    >
                        <Card.Body py={20}>
                            <VStack gap={4}>
                                <Spinner size="xl" colorPalette="purple" />
                                <Text color="gray.500" fontWeight="medium">Loading user...</Text>
                                <Text fontSize="sm" color="gray.400">Please wait a moment</Text>
                            </VStack>
                        </Card.Body>
                    </Card.Root>
                </Container>
            </Box>
        );
    }

    if (!user) {
        return (
            <Box bg="gray.50" minH="100vh" py={8}>
                <Container maxW="md" py={20}>
                    <Card.Root
                        variant="outline"
                        borderColor="gray.200"
                        borderRadius="2xl"
                        shadow="sm"
                        bg="white"
                    >
                        <Card.Body py={16} textAlign="center">
                            <VStack gap={4}>
                                <Icon as={FiXCircle} boxSize={12} color="red.500" />
                                <Heading size="md" color="gray.700">User not found</Heading>
                                <Text fontSize="sm" color="gray.500">The user you are looking for does not exist</Text>
                                <Button
                                    colorPalette="purple"
                                    onClick={() => router.back()}
                                    borderRadius="xl"
                                    mt={2}
                                >
                                    Go Back
                                </Button>
                            </VStack>
                        </Card.Body>
                    </Card.Root>
                </Container>
            </Box>
        );
    }

    return (
        <Box bg="gray.50" minH="100vh" py={3}>
            <Container maxW="lg" px={{ base: 4, md: 6 }}>
                <VStack align="stretch" gap={6}>
                    {/* Form */}
                    <ChangeRoleForm
                        userId={userId}
                        currentRole={user.role}
                        userName={user.name}
                        userEmail={user.email}
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
                                    💡 Changing a user's role affects their permissions in the system
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