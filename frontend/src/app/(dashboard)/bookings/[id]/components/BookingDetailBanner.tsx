'use client';

import { Box, Flex, HStack, Icon, Text, Badge } from '@chakra-ui/react';
import { FiBookOpen } from 'react-icons/fi';

interface BookingDetailBannerProps {
    bookingId: string;
    isMine: boolean;
}

export default function BookingDetailBanner({ bookingId, isMine }: BookingDetailBannerProps) {
    return (
        <Box
            bgGradient="to-r"
            gradientFrom={isMine ? 'green.500' : 'blue.500'}
            gradientTo={isMine ? 'green.600' : 'blue.600'}
            px={6}
            py={4}
        >
            <Flex justify="space-between" align="center" flexWrap="wrap" gap={2}>
                <HStack gap={2}>
                    <Icon as={FiBookOpen} color="white" boxSize={5} />
                    <Text color="white" fontWeight="bold" fontSize="lg">
                        Booking #{bookingId.slice(-6)}
                    </Text>
                </HStack>
                <Badge
                    colorPalette="white"
                    variant="solid"
                    fontSize="sm"
                    px={3}
                    py={1}
                    borderRadius="full"
                    bg="whiteAlpha.300"
                    color="white"
                >
                    {isMine ? '✓ My Booking' : 'Guest Booking'}
                </Badge>
            </Flex>
        </Box>
    );
}