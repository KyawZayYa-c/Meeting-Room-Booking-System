'use client';

import { Box, Button, Card, Flex, HStack, Heading, Icon, Text, Badge } from '@chakra-ui/react';
import { FiArrowLeft, FiPlus, FiRefreshCw, FiCalendar } from 'react-icons/fi';

interface BookingsHeaderProps {
    bookingsCount: number;
    onRefresh: () => void;
    isRefreshing: boolean;
    isLoading: boolean;
    onBack: () => void;
    onNewBooking: () => void;
}

export default function BookingsHeader({
                                           bookingsCount,
                                           onRefresh,
                                           isRefreshing,
                                           isLoading,
                                           onBack,
                                           onNewBooking,
                                       }: BookingsHeaderProps) {
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
                            onClick={onBack}
                            borderRadius="full"
                            colorPalette="gray"
                            bg='gray.50'
                            _hover={{ bg: 'gray.100', transform: 'scale(0.95)' }}
                            transition="all 0.2s"
                        >
                            <Icon as={FiArrowLeft} />
                        </Button>
                        <Box>
                            <HStack gap={2}>
                                <Icon as={FiCalendar} color="blue.500" boxSize={5} />
                                <Heading size="lg" color="gray.800" fontWeight="bold">
                                    Bookings
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
                                    {bookingsCount}
                                </Badge>
                            </HStack>
                            <Text fontSize="sm" color="gray.500" ml={7}>
                                View and manage all room bookings
                            </Text>
                        </Box>
                    </HStack>

                    {/* Right side: Refresh + New Booking */}
                    <HStack gap={3}>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onRefresh}
                            borderRadius="full"
                            colorPalette="blue"
                            _hover={{ bg: 'blue.50' }}
                            loading={isRefreshing || isLoading}
                            loadingText="Refreshing"
                        >
                            <Icon
                                as={FiRefreshCw}
                                mr={1}
                                animation={isRefreshing || isLoading ? 'spin 1s linear infinite' : 'none'}
                            />
                            Refresh
                        </Button>
                        <Button
                            colorPalette="blue"
                            onClick={onNewBooking}
                            size="lg"
                            borderRadius="xl"
                            shadow="md"
                            p={'2'}
                            _hover={{
                                transform: 'translateY(-2px)',
                                shadow: 'lg',
                                bg: 'blue.600'
                            }}
                            transition="all 0.2s"
                        >
                            <Icon as={FiPlus} />
                            New Booking
                        </Button>
                    </HStack>
                </Flex>
            </Card.Body>
        </Card.Root>
    );
}