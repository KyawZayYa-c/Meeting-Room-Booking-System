'use client';

import { SimpleGrid, Button, Icon } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FiLock, FiBookOpen } from 'react-icons/fi';

export default function ProfileActions() {
    const router = useRouter();

    return (
        <SimpleGrid columns={{ base: 1, sm: 2 }} gap={{ base: 3, md: 4 }}>
            <Button
                variant="outline"
                colorPalette="blue"
                size={{ base: 'md', md: 'lg' }}
                borderRadius="xl"
                onClick={() => router.push('/change-password')}
                justifyContent="center"
                fontSize={{ base: 'sm', md: 'md' }}
            >
                <Icon as={FiLock} mr={2} boxSize={{ base: 4, md: 5 }} />
                Change Password
            </Button>
            <Button
                colorPalette="blue"
                size={{ base: 'md', md: 'lg' }}
                borderRadius="xl"
                onClick={() => router.push('/bookings')}
                shadow="sm"
                justifyContent="center"
                fontSize={{ base: 'sm', md: 'md' }}
            >
                <Icon as={FiBookOpen} mr={2} boxSize={{ base: 4, md: 5 }} />
                View My Bookings
            </Button>
        </SimpleGrid>
    );
}