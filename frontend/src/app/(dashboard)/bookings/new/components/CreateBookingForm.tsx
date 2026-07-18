'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
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
import { FiCalendar, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';

interface CreateBookingFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function CreateBookingForm({ onSuccess, onCancel }: CreateBookingFormProps) {
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
            if (onSuccess) {
                onSuccess();
            } else {
                router.push('/bookings');
            }
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
                            <Heading size={{ base: 'md', sm: 'lg' }} color="gray.800" fontWeight="bold">
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
                                    <Icon as={FiCalendar} boxSize={4} />
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
                                        <Icon as={FiClock} boxSize={4} />
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
                                        <Icon as={FiClock} boxSize={4} />
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

                            {/* Action Buttons */}
                            <Flex gap={4} width="100%" flexWrap="wrap">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    fontSize={{ base: '13px', sm: 'md' }}
                                    flex="1"
                                    minWidth={{ base: '100%', sm: 'auto' }}
                                    onClick={() => {
                                        if (onCancel) {
                                            onCancel();
                                        } else {
                                            router.back();
                                        }
                                    }}
                                    borderRadius="xl"
                                    colorPalette="gray"
                                    _hover={{ bg: 'gray.100' }}
                                    transition="all 0.2s"
                                >
                                    <Icon as={FiXCircle} mr={2} />
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    colorPalette="blue"
                                    size="lg"
                                    fontSize={{ base: '13px', sm: 'md' }}
                                    flex="1"
                                    minWidth={{ base: '100%', sm: 'auto' }}
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
                                    <Icon as={FiCheckCircle} mr={2} />
                                    Create Booking
                                </Button>
                            </Flex>
                        </VStack>
                    </form>
                </VStack>
            </Card.Body>
        </Card.Root>
    );
}