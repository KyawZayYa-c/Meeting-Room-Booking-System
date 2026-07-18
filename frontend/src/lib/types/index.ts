export interface User {
    id: string;
    _id?: string;
    name: string;
    email: string;
    role: 'admin' | 'owner' | 'user';
    createdAt?: string;
    updatedAt?: string;
}

export interface Booking {
    _id: string;
    userId: string | User;
    date: string;
    startTime: string;
    endTime: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data: T;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
        token: string;
    };
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface BookingFormData {
    date: string;
    startTime: string;
    endTime: string;
}

export interface UserFormData {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'owner' | 'user';
}