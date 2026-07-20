// components/HomeFooter.tsx

'use client';

import { HStack, Icon, Text } from '@chakra-ui/react';
import { FiCheckCircle } from 'react-icons/fi';

export default function HomeFooter() {
    return (
        <HStack justify="center" gap={{ base: 2, md: 6 }} flexWrap="wrap">
            <HStack gap={1}>
                <Icon as={FiCheckCircle} boxSize={{ base: 2, md: 3 }} color="green.500" />
                <Text fontSize={{ base: '8px', md: 'xs' }} color="gray.500">
                    Secure & Encrypted
                </Text>
            </HStack>
            <HStack gap={1}>
                <Icon as={FiCheckCircle} boxSize={{ base: 2, md: 3 }} color="green.500" />
                <Text fontSize={{ base: '8px', md: 'xs' }} color="gray.500">
                    Free to Use
                </Text>
            </HStack>
            <HStack gap={1}>
                <Icon as={FiCheckCircle} boxSize={{ base: 2, md: 3 }} color="green.500" />
                <Text fontSize={{ base: '8px', md: 'xs' }} color="gray.500">
                    24/7 Access
                </Text>
            </HStack>
        </HStack>
    );
}