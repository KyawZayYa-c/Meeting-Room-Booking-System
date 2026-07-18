export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'admin' | 'owner' | 'user';
    createdAt?: string;
    updatedAt?: string;
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

export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
        token: string;
    };
}