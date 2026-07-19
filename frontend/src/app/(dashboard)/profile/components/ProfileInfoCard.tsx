'use client';

import { Box, HStack, Icon, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface ProfileInfoCardProps {
    icon: IconType;
    iconColor: string;
    label: string;
    value: string | number;
    isEmail?: boolean;
}

export default function ProfileInfoCard({ icon, iconColor, label, value, isEmail }: ProfileInfoCardProps) {
    return (
        <Box
            p={{ base: 3, md: 4 }}
            borderRadius="xl"
            border="1px"
            borderColor="gray.200"
            bg="gray.50"
        >
            <HStack gap={{ base: 2, md: 3 }}>
                <Icon as={icon} color={iconColor} boxSize={{ base: 4, md: 5 }} />
                <Box>
                    <Text fontSize={{ base: '11px', md: 'xs' }} color="gray.500" fontWeight="semibold" textTransform="uppercase" letterSpacing="wider">
                        {label}
                    </Text>
                    <Text
                        fontSize={{ base: '11px', md: 'sm' }}
                        fontWeight="medium"
                        color="gray.700"
                        wordBreak={isEmail ? "break-all" : "normal"}
                    >
                        {value}
                    </Text>
                </Box>
            </HStack>
        </Box>
    );
}