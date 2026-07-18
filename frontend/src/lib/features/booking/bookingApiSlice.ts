import { baseApi } from '../../api/baseApi';
import type { Booking, BookingFormData, ApiResponse } from '@/lib/types';

export const bookingApiSlice = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createBooking: build.mutation<ApiResponse<{ booking: Booking }>, BookingFormData>({
            query: (data) => ({
                url: '/bookings',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Bookings'],
        }),
        getAllBookings: build.query<ApiResponse<{ bookings: Booking[] }>, void>({
            query: () => '/bookings',
            providesTags: ['Bookings'],
        }),
        getBookingById: build.query<ApiResponse<{ booking: Booking }>, string>({
            query: (id) => `/bookings/${id}`,
            providesTags: ['Bookings'],
        }),
        getBookingsByUser: build.query<ApiResponse<{ bookings: Booking[] }>, string>({
            query: (userId) => `/bookings/user/${userId}`,
            providesTags: ['Bookings'],
        }),
        deleteBooking: build.mutation<ApiResponse<{ booking: Booking }>, string>({
            query: (id) => ({
                url: `/bookings/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Bookings'],
        }),
    }),
});

export const {
    useCreateBookingMutation,
    useGetAllBookingsQuery,
    useGetBookingByIdQuery,
    useGetBookingsByUserQuery,
    useDeleteBookingMutation,
} = bookingApiSlice;