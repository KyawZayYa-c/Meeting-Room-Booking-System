'use client';

import { Box, Icon, Heading, Text } from '@chakra-ui/react';
import { FiCalendar } from 'react-icons/fi';

export default function HomeHero() {
    return (
        <Box
            bgGradient="to-r"
            gradientFrom="blue.500"
            gradientTo="purple.600"
            p={{ base: 5, md: 10 }}
            textAlign="center"
            flexShrink={0}
        >
            <Box
                bg="whiteAlpha.200"
                borderRadius="full"
                p={{ base: 2, md: 3 }}
                display="inline-block"
                mb={{ base: 2, md: 4 }}
            >
                <Icon as={FiCalendar} boxSize={{ base: 6, md: 8 }} color="white" />
            </Box>
            <Heading
                size={{ base: 'xl', md: '4xl' }}
                color="white"
                fontWeight="bold"
                letterSpacing="tight"
            >
                Meeting Room Booking
            </Heading>
            <Text
                color="whiteAlpha.900"
                fontSize={{ base: 'sm', md: 'xl' }}
                fontWeight="medium"
                mt={{ base: 1, md: 2 }}
            >
                Simplify Your Meeting Space Management
            </Text>
            <Box
                w="60px"
                h="2px"
                bg="whiteAlpha.400"
                borderRadius="full"
                mx="auto"
                mt={{ base: 2, md: 3 }}
            />
        </Box>
    );
}