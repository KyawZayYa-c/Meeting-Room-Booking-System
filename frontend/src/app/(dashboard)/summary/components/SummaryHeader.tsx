'use client';

import { Box, HStack, Heading, Text, Button, Badge, Card, Icon, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiBarChart2 } from 'react-icons/fi';

interface SummaryHeaderProps {
    userRole: string;
}

export default function SummaryHeader({ userRole }: SummaryHeaderProps) {
    const router = useRouter();

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin':
                return 'red';
            case 'owner':
                return 'purple';
            default:
                return 'blue';
        }
    };

    return (
        <Card.Root
            variant="outline"
            borderColor="gray.200"
            borderRadius="2xl"
            shadow="sm"
            bg="white"
            overflow="hidden"
        >
            <Card.Body py={4}>
                <Flex
                    justify="space-between"
                    align="center"
                    flexWrap="wrap"
                    gap={4}
                >
                    {/* Left side: Back + Title */}
                    <HStack gap={3}>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.back()}
                            borderRadius="full"
                            colorPalette="gray"
                            bg="gray.50"
                            _hover={{ bg: 'gray.200', transform: 'scale(0.95)' }}
                            transition="all 0.2s"
                            flexShrink={0}
                        >
                            <Icon as={FiArrowLeft} />
                        </Button>
                        <Box>
                            <HStack gap={2}>
                                <Icon as={FiBarChart2} color="green.500" boxSize={5} />
                                <Heading size="lg" color="gray.800" fontWeight="bold">
                                    Summary
                                </Heading>
                                <Badge
                                    colorPalette="gray"
                                    variant="subtle"
                                    fontSize="xs"
                                    px={2}
                                    py={0.5}
                                    borderRadius="full"
                                    ml={1}
                                >
                                    Reports
                                </Badge>
                            </HStack>
                            <Text fontSize="sm" color="gray.500" ml={7}>
                                View booking statistics and usage reports
                            </Text>
                        </Box>
                    </HStack>

                    {/* Right side: Role Badge */}
                    <Badge
                        colorPalette={getRoleColor(userRole)}
                        variant="solid"
                        fontSize="xs"
                        px={3}
                        py={1.5}
                        borderRadius="full"
                        textTransform="capitalize"
                        fontWeight="semibold"
                        letterSpacing="wider"
                        display="flex"
                        alignItems="center"
                        gap={1.5}
                    >
                        <Box
                            as="span"
                            display="inline-block"
                            w="6px"
                            h="6px"
                            borderRadius="full"
                            bg="white"
                            opacity={0.8}
                        />
                        {userRole} Access
                    </Badge>
                </Flex>
            </Card.Body>
        </Card.Root>
    );
}