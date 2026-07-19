import { baseApi } from '../../api/baseApi';
import type { User, LoginData } from '@/lib/types';

interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
    };
}

export const authApiSlice = baseApi.injectEndpoints({
    endpoints: (build) => ({

        login: build.mutation<AuthResponse, LoginData>({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Auth'],
        }),

        logout: build.mutation<{ success: boolean; message: string }, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['Auth'],
        }),

        getMe: build.query<{ user: User }, void>({
            query: () => '/auth/me',
            providesTags: ['Auth'],
            transformResponse: (response: any) => {
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
    overrideExisting: true,
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useGetMeQuery,
} = authApiSlice;