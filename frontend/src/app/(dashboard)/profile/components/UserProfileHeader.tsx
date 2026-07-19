'use client';

import { HStack, Button, Icon, Heading } from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function BookingDetailHeader() {
    const router = useRouter();

    return (
        <HStack gap={3}>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                borderRadius="full"
                colorPalette="gray"
                bg="gray.100"
                _hover={{ bg: 'gray.200', transform: 'scale(0.95)' }}
                transition="all 0.2s"
            >
                <Icon as={FiArrowLeft} mr={1} />
                Back
            </Button>
            <Heading size={{ base: 'md', md: 'lg' }} color="gray.800" fontWeight="bold">
                Profile
            </Heading>
        </HStack>
    );
}