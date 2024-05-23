import React, { ReactNode } from 'react';
import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Tooltip,
} from '@chakra-ui/react';
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiBell,
    FiChevronDown,
    FiUser,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';

interface LinkItemProps {
    name: string;
    icon: IconType;
    link?: string;
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'Accueil', icon: FiHome, link: '/' },
    { name: "Notifications", icon: FiBell },
    { name: 'Profil', icon: FiUser, link: '/profile' },
    { name: 'Settings', icon: FiSettings },

];

export default function SidebarWithHeader({
    children,
}: {
    children: ReactNode;
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Flex h="100dvh" bg={"white"} direction={"column"}>
            <SidebarContent
                border="0px"
                onClose={() => onClose}
                display={{ base: 'none', md: 'flex' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box flex={"1"} border={"1px"} overflow={"scroll"} h={"100%"} borderTopLeftRadius={"15px"} borderColor={useColorModeValue('gray.200', 'brand.900')} ml={{ base: 0, md: 100 }} p="4">
                {children}
            </Box>
        </Flex>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
        <Flex
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'brand.900')}
            w={{ base: 'full', md: 100 }}
            pos="fixed"
            top="0"
            h="full"
            direction={'column'}
            justifyContent={'space-between'}
            {...rest}>
            <Flex h="20" alignItems="center" justifyContent="center">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Logo
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            <Flex direction="column">
                {LinkItems.map((link) => (
                    <NavItem key={link.name} icon={link.icon} name={link.name} link={link.link} />
                ))}
            </Flex>
            <VStack spacing={{ base: '0', md: '6' }} _hover={{ bg: "brand.900" }}>
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: 'none', bg: "brand:900" }}>

                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    src={
                                        'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    }
                                />
                                <VStack
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="0">
                                </VStack>
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'brand.900')}>
                            <MenuItem _hover={{ bg: "brand.900", color: "white", fontWeight: "700" }}>Profil</MenuItem>
                            <MenuItem _hover={{ bg: "brand.900", color: "white", fontWeight: "700" }}>Paramètres</MenuItem>
                            <MenuDivider />
                            <MenuItem _hover={{ bg: "brand.900", color: "white", fontWeight: "700" }}>Déconnexion</MenuItem>
                        </MenuList>
                    </Menu>
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
    return (
        <Tooltip label={name} aria-label={name} placement='right'>
            <Link href={link} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
                <Flex
                    align="center"
                    p="4"
                    mx="4"
                    borderRadius="lg"
                    role="group"
                    cursor="pointer"
                    justify="center"
                    _hover={{
                        bg: 'brand.900',
                        color: 'white',
                    }}
                    {...rest}>
                    {icon && (
                        <Icon
                            fontSize="20"
                            color={"black"}
                            as={icon}
                        />
                    )}
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
        <Flex
            marginLeft="0px"
            border="0px"
            ml={{ base: 0, md: 100 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            // borderBottomWidth="1px"
            // borderBottomColor={useColorModeValue('gray.200', 'brand.900')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            position={"sticky"}
            {...rest}>
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold">
                Logo
            </Text>

        </Flex>
    );
};
