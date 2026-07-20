'use client';

import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/store/hooks';
import { useGetMeQuery } from '@/lib/features/auth/authApiSlice';
import HomeHeroPage from "@/app/(dashboard)/homecomponents/HomeHeroPage";
import DashboardPage from "./(dashboard)/dashboard/page";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function HomePage() {
    const {  user } = useAppSelector((state) => state.auth);
    const { data: userData, isLoading } = useGetMeQuery(undefined);

    if (isLoading) {
        return (
            <LoadingSpinner />
        );
    }

    if (userData?.user || user) {
        return <DashboardPage />;
    }

    return <HomeHeroPage />;
}