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
export interface GroupedBooking {
    userId: string;
    userName: string;
    userEmail: string;
    userRole: string;
    totalBookings: number;
    bookings: {
        date: string;
        startTime: string;
        endTime: string;
        createdAt: string;
    }[];
}

export interface UsageSummary {
    totalBookings: number;
    totalUsers: number;
    perUser: {
        userId: string;
        userName: string;
        userEmail: string;
        userRole: string;
        count: number;
    }[];
    roleCounts: {
        _id: string;
        count: number;
    }[];
}

export interface GroupedBookingsResponse {
    data: GroupedBooking[];
}

export interface UsageSummaryResponse {
    data: UsageSummary;
}