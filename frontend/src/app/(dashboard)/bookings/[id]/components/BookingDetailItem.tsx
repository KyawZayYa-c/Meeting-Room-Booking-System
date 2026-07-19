'use client';

import { Box, HStack, Icon, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface BookingDetailItemProps {
    icon: IconType;
    label: string;
    value: string | number;
    color: string;
}

export default function BookingDetailItem({ icon, label, value, color }: BookingDetailItemProps) {
    return (
        <Box
            p={4}
            borderRadius="xl"
            border="1px"
            borderColor="gray.100"
            bg="white"
            _hover={{ bg: 'gray.50', borderColor: 'gray.300' }}
            transition="all 0.2s"
        >
            <HStack gap={3}>
                <Box
                    bg={`${color}.50`}
                    p={2}
                    borderRadius="lg"
                >
                    <Icon as={icon} color={`${color}.500`} boxSize={4} />
                </Box>
                <Box>
                    <Text fontSize="xs" color="gray.500" fontWeight="semibold" textTransform="uppercase" letterSpacing="wider">
                        {label}
                    </Text>
                    <Text fontSize="sm" fontWeight="medium" color="gray.700">
                        {value}
                    </Text>
                </Box>
            </HStack>
        </Box>
    );
}