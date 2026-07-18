import { baseApi } from '../../api/baseApi';
import type { User, LoginData, RegisterData, AuthResponse } from '@/lib/types';

export const authApiSlice = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // Register
        register: build.mutation<AuthResponse, RegisterData>({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Auth'],
        }),

        // Login
        login: build.mutation<AuthResponse, LoginData>({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Auth'],
        }),

        // Logout
        logout: build.mutation<{ success: boolean; message: string }, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['Auth'],
        }),

        // Get current user
        getMe: build.query<{ user: User }, void>({
            query: () => '/auth/me',
            providesTags: ['Auth'],
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useGetMeQuery,
} = authApiSlice;