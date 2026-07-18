export const getRoleColor = (role: string): string => {
    switch (role) {
        case 'admin':
            return 'red';
        case 'owner':
            return 'purple';
        default:
            return 'blue';
    }
};

export const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
};

export const isAdmin = (role: string): boolean => role === 'admin';
export const isOwner = (role: string): boolean => role === 'owner';
export const isUser = (role: string): boolean => role === 'user';
export const isAdminOrOwner = (role: string): boolean => role === 'admin' || role === 'owner';