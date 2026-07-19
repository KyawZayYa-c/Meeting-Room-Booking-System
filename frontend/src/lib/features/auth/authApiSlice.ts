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
            transformResponse: (response: any) => {
                // Backend က { success: true, data: { user: {...} } } ပြန်တယ်
                if (response?.data?.user) {
                    return { user: response.data.user };
                }
                if (response?.user) {
                    return { user: response.user };
                }
                return { user: null as any };
            },
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useGetMeQuery,
} = authApiSlice;