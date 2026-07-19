'use client';

import { HStack, Button, Icon } from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

interface BookingDetailActionsProps {
    canDelete: boolean;
    onDelete: () => void;
    isDeleting: boolean;
}

export default function BookingDetailActions({ canDelete, onDelete, isDeleting }: BookingDetailActionsProps) {
    const router = useRouter();

    return (
        <HStack gap={4} justify={{ base: 'center', sm: 'flex-end' }} flexWrap="wrap">
            <Button
                variant="outline"
                colorPalette="gray"
                onClick={() => router.push('/bookings')}
                borderRadius="xl"
                _hover={{ bg: 'gray.100' }}
                transition="all 0.2s"
            >
                Back to Bookings
            </Button>
            {canDelete && (
                <Button
                    colorPalette="red"
                    onClick={onDelete}
                    loading={isDeleting}
                    borderRadius="xl"
                    shadow="sm"
                    _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
                    transition="all 0.2s"
                >
                    <Icon as={FiTrash2} mr={2} />
                    Delete Booking
                </Button>
            )}
        </HStack>
    );
}