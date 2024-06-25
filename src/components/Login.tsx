'use client'

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'

import React, { useRef } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { CreateAccountButton } from "@components/LoginButton";

type Props = {
    className?: string;
    callbackUrl?: string;
    error?: string;
}

const Login = (props: Props) => {
    const userName = useRef<string>("");
    const password = useRef<string>("");

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await signIn("credentials", {
            username: userName.current,
            password: password.current,
            redirect: true,
            callbackUrl: props.callbackUrl || "/",
        });
    }

    const handleGoogleSignIn = async () => {
        await signIn('google', {
            callbackUrl: props.callbackUrl || "/",
        });
    }

    return (

        <Flex
            minH={'100%'}
            align={'center'}
            justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'left'} >Heureux de vous revoir !</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        Connectez-vous pour profiter de toutes nos <Text as={"span"} color={'blue.400'}>fonctionalitées</Text> ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email</FormLabel>
                            <Input type="email" />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Mot de passe</FormLabel>
                            <Input type="password" />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Se rappeler de moi</Checkbox>
                                <Text color={'blue.400'}>Mot de passe oublié?</Text>
                            </Stack>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Se connecter
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}
export default Login;