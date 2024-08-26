'use client';

import React, { ReactNode } from 'react';
import {
    Avatar,
    Box,
    BoxProps,
    CloseButton,
    Drawer,
    DrawerContent,
    Flex,
    FlexProps,
    HStack,
    Icon,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    Tooltip,
    useColorModeValue,
    useDisclosure,
    VStack
} from '@chakra-ui/react';
import { FiBell, FiChevronDown, FiHome, FiMenu, FiSettings, FiUser } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import User from "@/models/User";

interface LinkItemProps {
    name: string;
    icon: IconType;
    link?: string;
}

const LinkItems: Array<LinkItemProps> = [
    { name: 'Accueil', icon: FiHome, link: '/' },
    // {name: "Notifications", icon: FiBell},
    { name: 'Profil', icon: FiUser, link: '/profile' },
    { name: 'Settings', icon: FiSettings, link: '/settings/account' },
];

export default function SidebarWithHeader({ children }: { children: ReactNode }) {
    const session = useSession();
    const user = session.data?.user

    const path = usePathname();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const router = useRouter();

    if (!session || (session.status === "unauthenticated" && path !== "/auth/signin" && path !== "/auth/signup")) {
        router.push("/auth/signin");
    }

    return (
        <Flex h="100dvh" bg="white" direction="column">
            <SidebarContent onClose={onClose} display={{ base: 'none', md: 'flex' }} user={user} />
            <Drawer autoFocus={false} isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false}
                onOverlayClick={onClose} size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} user={user} />
                </DrawerContent>
            </Drawer>
            <MobileNav onOpen={onOpen} />
            <Box flex="1" border="1px" overflow="scroll" h="100%" borderTopLeftRadius="15px"
                borderColor={useColorModeValue('gray.200', 'brand.900')} ml={{ base: 0, md: 100 }} p="4">
                {children}
            </Box>
        </Flex>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
    user: User;
}

const SidebarContent = ({ user, onClose, ...rest }: SidebarProps) => {
    const isLogged = useSession().status === "authenticated";
    const menuColors = {
        bg: useColorModeValue('white', 'gray.900'),
        border: useColorModeValue('gray.200', 'brand.900'),
    };

    const router = useRouter();

    return (
        <Flex transition="3s ease" bg={menuColors.bg} borderRight="1px" borderRightColor={menuColors.border}
            w={{ base: 'full', md: 100 }} pos="fixed" top="0" h="full" direction="column"
            justifyContent="space-between" {...rest}>
            <Flex h="20" alignItems="center" justifyContent="center">
                <Text fontSize="2xl" fontFamily="Montserrat" fontWeight="bold" color="black">
                    LL
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {isLogged && (
                <Flex direction="column">
                    {LinkItems.map((link) => (
                        <NavItem key={link.name} icon={link.icon} name={link.name} link={link.link} />
                    ))}
                </Flex>
            )}
            <VStack spacing={{ base: '0', md: '6' }} _hover={{ bg: "brand.900" }}>
                <Flex alignItems="center">
                    {isLogged && (
                        <Menu>
                            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none', bg: "brand:900" }}>
                                <HStack>
                                    <Avatar size="sm" name={user?.firstName + " " + user?.lastName} src={user?.image} />
                                    <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px"
                                        ml="0" />
                                    <Box display={{ base: 'none', md: 'flex' }}>
                                        <FiChevronDown />
                                    </Box>
                                </HStack>
                            </MenuButton>
                            <MenuList bg={menuColors.bg} borderColor={menuColors.border}>
                                <MenuItem _hover={{ bg: "brand.900", color: "black", fontWeight: "700" }}
                                    transition="all 0.2s ease" onClick={() => signOut()}>
                                    Déconnexion
                                </MenuItem>
                                <MenuItem _hover={{ bg: "brand.900", color: "black", fontWeight: "700" }}
                                    transition="all 0.2s ease">
                                    Account: {user?.email}
                                </MenuItem>

                                {user?.role === "ADMIN" && (
                                    <MenuItem _hover={{ bg: "brand.900", color: "black", fontWeight: "700" }}
                                        transition="all 0.2s ease" onClick={() => router.push("/admin")}>
                                        Admin
                                    </MenuItem>
                                )}
                            </MenuList>
                        </Menu>
                    )}
                </Flex>
            </VStack>
        </Flex>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    name: string;
    link?: string;
}

const NavItem = ({ icon, name, link, ...rest }: NavItemProps) => {
    const pathName = usePathname();
    return (
        <Tooltip label={name} aria-label={name} placement="right">
            <Link href={link} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none', bg: "brand.900" }} mt={2}
                p="4" mx="4" borderRadius="lg" role="group" cursor="pointer"
                bg={pathName === link ? "brand.900" : "white"} _active={{ bg: "brand.900" }} transition="all .4s ease"
                _hover={{ bg: 'brand.900', color: 'white', transition: 'all .2s ease' }}>
                <Flex justify="center" align="center" {...rest}>
                    {icon && <Icon fontSize="20" color="black" as={icon} />}
                </Flex>
            </Link>
        </Tooltip>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    return (
        <Flex marginLeft="0px" ml={{ base: 0, md: 100 }} px={{ base: 4, md: 4 }} height="20" alignItems="center"
            bg={useColorModeValue('white', 'gray.900')} justifyContent={{ base: 'space-between', md: 'flex-end' }}
            position="sticky" {...rest}>
            <IconButton display={{ base: 'flex', md: 'none' }} onClick={onOpen} variant="outline" aria-label="open menu"
                icon={<FiMenu />} />
            <Text display={{ base: 'flex', md: 'none' }} fontSize="2xl" fontFamily="Montserrat" fontWeight="bold">
                LL
            </Text>
        </Flex>
    );
};

