'use client';

import { SimpleGrid, Box, Icon, Heading, Text } from '@chakra-ui/react';
import { FiCalendar, FiUsers, FiClock } from 'react-icons/fi';

const features = [
    { icon: FiCalendar, title: 'Easy Booking', description: 'Book meeting rooms in seconds' },
    { icon: FiUsers, title: 'Team Collaboration', description: 'Manage bookings with your team' },
    { icon: FiClock, title: 'Real-time Updates', description: 'See availability instantly' },
];

export default function HomeFeatures() {
    return (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={{ base: 2, md: 4 }}>
            {features.map((feature, index) => (
                <Box
                    key={index}
                    p={{ base: 2.5, md: 4 }}
                    borderRadius="xl"
                    border="1px"
                    borderColor="gray.100"
                    bg="gray.50"
                    textAlign="center"
                    _hover={{
                        transform: { base: 'none', md: 'translateY(-4px)' },
                        shadow: { base: 'none', md: 'md' },
                        borderColor: 'blue.200',
                        bg: 'white'
                    }}
                    transition="all 0.3s"
                >
                    <Box
                        bg="blue.50"
                        borderRadius="full"
                        p={{ base: 1, md: 2 }}
                        display="inline-block"
                        mb={{ base: 0.5, md: 2 }}
                    >
                        <Icon as={feature.icon} boxSize={{ base: 3.5, md: 5 }} color="blue.500" />
                    </Box>
                    <Heading size={{ base: 'xs', md: 'sm' }} color="gray.700" fontWeight="bold">
                        {feature.title}
                    </Heading>
                    <Text fontSize={{ base: '9px', md: 'xs' }} color="gray.500" mt={0.5}>
                        {feature.description}
                    </Text>
                </Box>
            ))}
        </SimpleGrid>
    );
}