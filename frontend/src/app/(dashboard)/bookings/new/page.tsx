'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Container,
    Box,
    Heading,
    VStack,
    Field,
    Input,
    Button,
    HStack,
    Text,
    Card,
    Flex,
    Icon,
    Separator,
    Badge,
} from '@chakra-ui/react';
import { BookingSchema, BookingFormData } from '@/lib/schemas/bookingSchema';
import { useCreateBookingMutation } from '@/lib/features/booking/bookingApiSlice';
import { toaster } from '@/components/ui/toaster';
import { FiArrowLeft, FiCalendar, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';

export default function NewBookingPage() {
    const router = useRouter();
    const [createBooking, { isLoading }] = useCreateBookingMutation();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<BookingFormData>({
        resolver: zodResolver(BookingSchema),
        defaultValues: {
            date: '',
            startTime: '',
            endTime: '',
        },
    });

    const onSubmit = async (data: BookingFormData) => {
        try {
            await createBooking(data).unwrap();
            toaster.create({
                title: 'Booking created successfully! 🎉',
                type: 'success',
            });
            reset();
            router.push('/bookings');
        } catch (error: any) {
            toaster.create({
                title: error.data?.message || 'Failed to create booking',
                type: 'error',
            });
        }
    };

    // Watch form values for preview
    const watchedDate = watch('date');
    const watchedStartTime = watch('startTime');
    const watchedEndTime = watch('endTime');

    return (
        <Box bg="gray.50" minH="100vh" py={50}>
            <Container maxW="lg" px={4}>
                <VStack align="stretch" gap={10}>
                    {/* Header */}


                    {/* Main Form Card */}
                    <Card.Root
                        variant="outline"
                        borderColor="gray.200"
                        borderRadius="2xl"
                        shadow="lg"
                        bg="white"
                        overflow="hidden"
                    >
                        <Card.Body p={{ base: 4, sm: 6 }}>
                            <VStack gap={6} align="stretch">
                                {/* Form Header */}
                                <Box>
                                    <HStack gap={3}>
                                        <Icon as={FiCalendar} color="blue.500" boxSize={6} />
                                        <Heading size="lg" color="gray.800" fontWeight="bold">
                                            Create New Booking
                                        </Heading>
                                    </HStack>
                                    <Text fontSize="sm" color="gray.500" ml={{ base: 0, sm: 9 }} mt={1}>
                                        Fill in the details below to book a meeting room
                                    </Text>
                                </Box>

                                <Separator borderColor="gray.200" />

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <VStack gap={5} align="stretch">
                                        {/* Date Field */}
                                        <Field.Root required invalid={!!errors.date}>
                                            <Field.Label display="flex" alignItems="center" gap={2}>
                                                <Icon as={FiCalendar}  />
                                                Date
                                            </Field.Label>
                                            <Input
                                                type="date"
                                                size="lg"
                                                {...register('date')}
                                                bg="gray.50"
                                                borderColor="gray.200"
                                                _hover={{ borderColor: 'blue.400' }}
                                                _focus={{
                                                    borderColor: 'blue.500',
                                                    boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.2)',
                                                    bg: 'white'
                                                }}
                                                transition="all 0.2s"
                                                min={new Date().toISOString().split('T')[0]}
                                            />
                                            {errors.date && (
                                                <Field.ErrorText>
                                                    <Icon as={FiXCircle} mr={1} />
                                                    {errors.date.message}
                                                </Field.ErrorText>
                                            )}
                                        </Field.Root>

                                        {/* Start and End Time Wrappers */}
                                        <Flex gap={4} direction={{ base: 'column', sm: 'row' }}>
                                            {/* Start Time Field */}
                                            <Field.Root required invalid={!!errors.startTime} flex="1">
                                                <Field.Label display="flex" alignItems="center" gap={2}>
                                                    <Icon as={FiClock} />
                                                    Start Time
                                                </Field.Label>
                                                <Input
                                                    type="time"
                                                    size="lg"
                                                    {...register('startTime')}
                                                    bg="gray.50"
                                                    borderColor="gray.200"
                                                    _hover={{ borderColor: 'blue.400' }}
                                                    _focus={{
                                                        borderColor: 'blue.500',
                                                        boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.2)',
                                                        bg: 'white'
                                                    }}
                                                    transition="all 0.2s"
                                                />
                                                {errors.startTime && (
                                                    <Field.ErrorText>
                                                        <Icon as={FiXCircle} mr={1} />
                                                        {errors.startTime.message}
                                                    </Field.ErrorText>
                                                )}
                                            </Field.Root>

                                            {/* End Time Field */}
                                            <Field.Root required invalid={!!errors.endTime} flex="1">
                                                <Field.Label display="flex" alignItems="center" gap={2}>
                                                    <Icon as={FiClock}  />
                                                    End Time
                                                </Field.Label>
                                                <Input
                                                    type="time"
                                                    size="lg"
                                                    {...register('endTime')}
                                                    bg="gray.50"
                                                    borderColor="gray.200"
                                                    _hover={{ borderColor: 'blue.400' }}
                                                    _focus={{
                                                        borderColor: 'blue.500',
                                                        boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.2)',
                                                        bg: 'white'
                                                    }}
                                                    transition="all 0.2s"
                                                />
                                                {errors.endTime && (
                                                    <Field.ErrorText>
                                                        <Icon as={FiXCircle} mr={1} />
                                                        {errors.endTime.message}
                                                    </Field.ErrorText>
                                                )}
                                            </Field.Root>
                                        </Flex>

                                        {/* Preview Section */}
                                        {watchedDate && watchedStartTime && watchedEndTime && (
                                            <Box
                                                bg="blue.50"
                                                p={4}
                                                borderRadius="xl"
                                                border="1px"
                                                borderColor="blue.200"
                                            >
                                                <HStack gap={2} mb={1}>
                                                    <Icon as={FiCheckCircle} color="blue.500" />
                                                    <Text fontWeight="semibold" fontSize="sm" color="blue.700">
                                                        Booking Preview
                                                    </Text>
                                                </HStack>
                                                <Text fontSize="sm" color="blue.600">
                                                    📅 {new Date(watchedDate).toLocaleDateString('en-US', {
                                                    weekday: 'short',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                                    {' · '}
                                                    🕐 {watchedStartTime} - {watchedEndTime}
                                                </Text>
                                            </Box>
                                        )}

                                        <Separator borderColor="gray.200" />

                                        {/* 💡 ပြင်ဆင်လိုက်သော နေရာဖြစ်သည်: Flex ကို အသုံးပြုပြီး responsive ချက်ချင်းပြောင်းစေပါတယ် */}
                                        <Flex gap={4} width="100%" >
                                            <Button
                                                variant="outline"
                                                size="lg"
                                                flex="1"
                                                onClick={() => router.back()}
                                                borderRadius="xl"
                                                colorPalette="gray"
                                                _hover={{ bg: 'gray.100' }}
                                                transition="all 0.2s"
                                            >
                                                <Icon as={FiXCircle} mr={1} />
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                colorPalette="blue"
                                                size="lg"
                                                flex="1"
                                                loading={isLoading || isSubmitting}
                                                loadingText="Creating..."
                                                borderRadius="xl"
                                                shadow="md"
                                                _hover={{
                                                    transform: 'translateY(-2px)',
                                                    shadow: 'lg',
                                                    bg: 'blue.600'
                                                }}
                                                transition="all 0.2s"
                                            >
                                                <Icon as={FiCheckCircle} mr={1} />
                                                Booking
                                            </Button>
                                        </Flex>
                                    </VStack>
                                </form>
                            </VStack>
                        </Card.Body>
                    </Card.Root>

                    {/* Info Card */}
                    <Card.Root
                        variant="outline"
                        borderColor="gray.200"
                        borderRadius="2xl"
                        shadow="sm"
                        bg="white"
                    >
                        <Card.Body py={3}>
                            <Flex justify="space-between" align="center" flexWrap="wrap" gap={2}>
                                <Text fontSize="xs" color="gray.500">
                                    💡 Select a date and time for your meeting room booking
                                </Text>
                                <Badge colorPalette="gray" variant="subtle" fontSize="xs" px={2} py={0.5} borderRadius="full">
                                    Required fields *
                                </Badge>
                            </Flex>
                        </Card.Body>
                    </Card.Root>
                </VStack>
            </Container>
        </Box>
    );
}