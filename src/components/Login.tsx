'use client'

import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'

import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { Field, Form, Formik } from 'formik';

type Props = {
    className?: string;
    callbackUrl?: string;
    error?: string;
}

const Login = (props: Props) => {
    const router = useRouter();

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
                    <Heading fontSize={'4xl'} w={"100%"}>Heureux de vous revoir !</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        Connectez-vous pour profiter de toutes nos <Text as={"span"}
                            color={'blue.400'}>fonctionalitées</Text> ✌️
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
                                email: "",
                                password: "",
                            }}
                            onSubmit={async (values, actions) => {
                                try {
                                    const res = await signIn("credentials", { email: values.email, password: values.password, callbackURL: "/", redirect: false });
                                    if (res?.status == 200) {
                                        window.location.href = "/";
                                    } else if (res?.error === 'custom error to the client') {
                                        // handle this particular error
                                        console.log(res.error)
                                    } else {
                                        // handle generic error
                                    }
                                    // router push to the home page but only if the user is authenticated
                                    // window.location.href = "/";


                                } catch (error) {
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
                                    <Button onClick={handleGoogleSignIn} textAlign={'center'} mt={4} w={'full'}>Se
                                        connecter avec Google</Button>
                                    <Button onClick={() => router.push("/auth/signup")} textAlign={'center'} mt={10}
                                        w={'full'}>Créer mon compte</Button>
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
