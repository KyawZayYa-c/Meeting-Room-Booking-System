import z from "zod";

export const CreateUserSchema = z.object({
    name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(['admin', 'owner', 'user']).default('user'),
});

export const ChangePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmNewPassword: z.string().min(6, "Confirm new password is required"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
});

export type CreateUserFormData = z.infer<typeof CreateUserSchema>;
export type ChangePasswordFormData = z.infer<typeof ChangePasswordSchema>;