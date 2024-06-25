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
import { redirect, useRouter } from 'next/navigation';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import CreateUser from '@/app/actions/users/create';

type Props = {
    className?: string;
    callbackUrl?: string;
    error?: string;
}

const Login = (props: Props) => {
    const router = useRouter();
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
                    <Heading fontSize={'4xl'} w={"100%"} >Heureux de vous revoir !</Heading>
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
                        <Formik
                            initialValues={{
                                firstName: "",
                                lastName: "",
                                password: "",
                                email: "",
                                cityId: 1,
                            }}
                            onSubmit={async (values, actions) => {
                                try {
                                    await signIn("credentials", {
                                        username: userName.current,
                                        password: password.current,
                                        redirect: true,
                                        callbackUrl: props.callbackUrl || "/",
                                    });
                                } catch (error) {
                                    console.log(values);
                                    console.error(error);
                                }
                            }}
                        >
                            {(props) => (
                                <Form>
                                    <Field name='email'>
                                        {({ field, form }) => (
                                            <FormControl mt={4} isRequired>
                                                <FormLabel>Email</FormLabel>
                                                <Input type='email' {...field} placeholder='john@email.com' />
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name='password'>
                                        {({ field, form }) => (
                                            <FormControl mt={4} isRequired>
                                                <FormLabel>Mot de passe</FormLabel>
                                                <Input min={8} type='password' {...field} placeholder='***********' />
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Button
                                        textAlign={'center'}
                                        mt={8}
                                        w={'full'}
                                        type='submit'
                                        colorScheme={'blue'}
                                        isLoading={props.isSubmitting}>Se connecter</Button>
                                    <Button onClick={handleGoogleSignIn} textAlign={'center'} mt={4} w={'full'}>Se connecter avec Google</Button>
                                    <Button onClick={() => router.push("/auth/signup")} textAlign={'center'} mt={10} w={'full'} >Créer mon compte</Button>
                                </Form>
                            )}
                        </Formik>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}
export default Login;
