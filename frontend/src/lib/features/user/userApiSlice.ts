import { baseApi } from '../../api/baseApi';
import type { User, UserFormData, ApiResponse } from '@/lib/types';

export const userApiSlice = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllUsers: build.query<ApiResponse<{ users: User[] }>, void>({
            query: () => '/users',
            providesTags: ['Users'],
        }),
        getUserById: build.query<ApiResponse<{ user: User; bookingCount: number }>, string>({
            query: (id) => `/users/${id}`,
            providesTags: ['Users'],
        }),
        createUser: build.mutation<ApiResponse<{ user: User }>, UserFormData>({
            query: (data) => ({
                url: '/users',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Users'],
        }),
        updateUserRole: build.mutation<ApiResponse<{ user: User }>, { id: string; role: string }>({
            query: ({ id, role }) => ({
                url: `/users/${id}/role`,
                method: 'PUT',
                body: { role },
            }),
            invalidatesTags: ['Users'],
        }),
        changePassword: build.mutation<
            ApiResponse<{}>,
            { id: string; currentPassword: string; newPassword: string }
        >({
            query: ({ id, currentPassword, newPassword }) => ({
                url: `/users/${id}/password`,
                method: 'PUT',
                body: { currentPassword, newPassword },
            }),
        }),
        deleteUser: build.mutation<ApiResponse<{ user: User }>, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users', 'Bookings'],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserRoleMutation,
    useChangePasswordMutation,
    useDeleteUserMutation,
} = userApiSlice;