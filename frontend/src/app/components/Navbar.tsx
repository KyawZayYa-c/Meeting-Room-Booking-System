'use client';

import { useRouter, usePathname } from 'next/navigation';
import {
    Box,
    Flex,
    Heading,
    HStack,
    Button,
    Badge,
    Text,
    Container,
    Avatar,
    Menu,
    IconButton,
    VStack,
    Separator,
    Icon,
    Portal,
} from '@chakra-ui/react';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { logout } from '@/lib/store/slices/authSlice';
import { useLogoutMutation } from '@/lib/features/auth/authApiSlice';
import { toaster } from '@/components/ui/toaster';
import { getRoleColor } from '@/utils/helpers';
import {
    FiHome,
    FiCalendar,
    FiUsers,
    FiBarChart2,
    FiLogOut,
    FiUser,
    FiChevronDown,
    FiMenu
} from 'react-icons/fi';
import { useState } from 'react';

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const [logoutApi] = useLogoutMutation();
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    if (!isAuthenticated || pathname === '/login') {
        return null;
    }

    const handleLogout = async () => {
        try {
            await logoutApi().unwrap();
            dispatch(logout());
            toaster.create({
                title: 'Logged out successfully',
                type: 'success',
            });
            router.push('/login');
        } catch (error) {
            toaster.create({
                title: 'Logout failed',
                type: 'error',
            });
        }
    };

    const isActive = (href: string) => {
        if (href === '/dashboard') {
            return pathname === '/dashboard' || pathname === '/';
        }
        return pathname === href;
    };

    const navItems = [
        { label: 'Dashboard', href: '/dashboard', icon: FiHome },
        { label: 'Bookings', href: '/bookings', icon: FiCalendar },
        ...(user?.role === 'admin' ? [{ label: 'Users', href: '/admin/users', icon: FiUsers }] : []),
        ...(user?.role === 'admin' || user?.role === 'owner' ? [{ label: 'Summary', href: '/summary', icon: FiBarChart2 }] : []),
    ];

    return (
        <Box
            bg="white"
            borderBottom="1px"
            borderColor="gray.200"
            position="sticky"
            top={0}
            zIndex={100}
            shadow="sm"
        >
            <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
                <Flex justify="space-between" align="center" py={3} gap={3}>
                    {/* Logo */}
                    <Heading
                        size={{ base: 'sm', md: 'md' }}
                        color="blue.600"
                        cursor="pointer"
                        onClick={() => router.push('/dashboard')}
                        fontWeight="bold"
                        letterSpacing="tight"
                        whiteSpace="nowrap"
                    >
                        🏢 Meeting Room
                    </Heading>

                    {/* Desktop Navigation */}
                    <HStack
                        display={{ base: 'none', lg: 'flex' }}
                        flexWrap="wrap"
                    >
                        {navItems.map((item) => (
                            <Button
                                key={item.href}
                                variant={isActive(item.href) ? 'solid' : 'ghost'}
                                colorPalette={isActive(item.href) ? 'blue' : 'gray'}
                                size="sm"
                                borderRadius="full"
                                px={2}
                                onClick={() => router.push(item.href)}
                                _hover={{ transform: 'translateY(-1px)' }}
                                transition="all 0.2s"
                            >
                                <Icon as={item.icon} mr={1} />
                                {item.label}
                            </Button>
                        ))}
                    </HStack>

                    {/* User Profile & Actions */}
                    <HStack gap={2}>
                        {/* Role Badge - Desktop */}
                        <Badge
                            colorPalette={getRoleColor(user?.role || 'user')}
                            fontSize="xs"
                            px={2.5}
                            py={1}
                            borderRadius="full"
                            textTransform="capitalize"
                            display={{ base: 'none', lg: 'flex' }}
                        >
                            {user?.role}
                        </Badge>

                        {/* Profile Menu */}
                        <Menu.Root>
                            <Menu.Trigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    borderRadius="full"
                                    px={2}
                                    _hover={{ bg: 'gray.100' }}
                                    transition="all 0.2s"
                                >
                                    <HStack gap={2}>
                                        <Avatar.Root size="sm">
                                            <Avatar.Fallback
                                                name={user?.name || 'User'}
                                                bg="blue.500"
                                                p={1}
                                                color="white"
                                                fontSize="xs"
                                            />
                                        </Avatar.Root>
                                        <VStack
                                            gap={0}
                                            align="start"
                                            display={{ base: 'none', lg: 'flex' }}
                                        >
                                            <Text fontSize="xs" fontWeight="semibold" color="gray.700" lineHeight="1.2">
                                                {user?.name}
                                            </Text>
                                        </VStack>
                                        <Icon
                                            as={FiChevronDown}
                                            boxSize={4}
                                            color="gray.400"
                                            display={{ base: 'none', lg: 'block' }}
                                        />
                                    </HStack>
                                </Button>
                            </Menu.Trigger>
                            <Portal>
                                <Menu.Positioner display={{ base: 'none', lg: 'flex' }}>
                                    <Menu.Content
                                        width="220px"
                                        shadow="lg"
                                        borderRadius="xl"
                                        border="1px"
                                        borderColor="gray.200"
                                        bg="white"
                                        zIndex={1000}
                                    >
                                        <Menu.Item
                                            value="profile"
                                            onClick={() => router.push('/profile')}
                                            _hover={{ bg: 'gray.50' }}
                                            borderRadius="md"
                                        >
                                            <Icon as={FiUser} mr={2} />
                                            Profile
                                        </Menu.Item>

                                        <Menu.Separator />
                                        <Menu.Item
                                            value="logout"
                                            onClick={handleLogout}
                                            color="red.500"
                                            _hover={{ bg: 'red.50' }}
                                            borderRadius="md"
                                        >
                                            <Icon as={FiLogOut} mr={2} />
                                            Logout
                                        </Menu.Item>
                                    </Menu.Content>
                                </Menu.Positioner>
                            </Portal>
                        </Menu.Root>

                        {/* Mobile Menu Toggle */}
                        <IconButton
                            aria-label="Open menu"
                            variant="ghost"
                            size="sm"
                            display={{ base: 'flex', lg: 'none' }}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            borderRadius="full"
                            _hover={{ bg: 'gray.100' }}
                        >
                            <Icon as={FiMenu} boxSize={5} />
                        </IconButton>
                    </HStack>
                </Flex>

                {/* Mobile Navigation - Overlay */}
                {isMobileMenuOpen && (
                    <Box
                        position="absolute"
                        top="100%"
                        left={0}
                        right={0}
                        bg="white"
                        borderBottom="1px"
                        borderColor="gray.200"
                        shadow="lg"
                        py={4}
                        px={4}
                        zIndex={200}
                        display={{ base: 'block', lg: 'none' }}
                    >
                        <VStack align="stretch" gap={2}>
                            {/* User info in mobile menu */}
                            <Box px={3} py={2} bg="gray.50" borderRadius="lg" mb={2}>
                                <HStack gap={3}>
                                    <Avatar.Root size="md">
                                        <Avatar.Fallback
                                            name={user?.name || 'User'}
                                            bg="blue.500"
                                            color="white"
                                            fontSize="sm"
                                            p={1}
                                        />
                                    </Avatar.Root>
                                    <Box>
                                        <Text fontSize="sm" fontWeight="semibold" color="gray.700">
                                            {user?.name}
                                        </Text>
                                        <Badge
                                            colorPalette={getRoleColor(user?.role || 'user')}
                                            fontSize="9px"
                                            px={2}
                                            py={0.5}
                                            borderRadius="full"
                                            mt={0.5}
                                        >
                                            {user?.role}
                                        </Badge>
                                    </Box>
                                </HStack>
                            </Box>

                            {navItems.map((item) => (
                                <Button
                                    key={item.href}
                                    variant={isActive(item.href) ? 'solid' : 'ghost'}
                                    colorPalette={isActive(item.href) ? 'blue' : 'gray'}
                                    size="md"
                                    borderRadius="lg"
                                    justifyContent="flex-start"
                                    px={4}
                                    onClick={() => {
                                        router.push(item.href);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    _hover={{ transform: 'translateX(4px)' }}
                                    transition="all 0.2s"
                                >
                                    <Icon as={item.icon} mr={2.5} boxSize={5} />
                                    {item.label}
                                </Button>
                            ))}
                            <Separator />
                            <Button
                                variant="ghost"
                                colorPalette="gray"
                                size="md"
                                borderRadius="lg"
                                justifyContent="flex-start"
                                px={4}
                                onClick={() => {
                                    router.push('/profile');
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                <Icon as={FiUser} mr={2.5} boxSize={5} />
                                Profile
                            </Button>

                            <Separator />
                            <Button
                                variant="ghost"
                                colorPalette="red"
                                size="md"
                                borderRadius="lg"
                                justifyContent="flex-start"
                                px={4}
                                onClick={handleLogout}
                            >
                                <Icon as={FiLogOut} mr={2.5} boxSize={5} />
                                Logout
                            </Button>
                        </VStack>
                    </Box>
                )}
            </Container>
        </Box>
    );
}