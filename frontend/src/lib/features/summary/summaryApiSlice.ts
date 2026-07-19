import { baseApi } from '../../api/baseApi';
import type { ApiResponse, GroupedBooking, UsageSummary } from '@/lib/types';

export const summaryApiSlice = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getGroupedBookings: build.query<ApiResponse<{ data: GroupedBooking[] }>, void>({
            query: () => '/summary/grouped',
            providesTags: ['Bookings'],
        }),
        getUsageSummary: build.query<ApiResponse<{ data: UsageSummary }>, void>({
            query: () => '/summary/usage',
            providesTags: ['Bookings'],
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetGroupedBookingsQuery,
    useGetUsageSummaryQuery,
} = summaryApiSlice;