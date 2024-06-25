'use client'

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'

import React, { useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { Formik, Field, Form } from 'formik';

type Props = {
    className?: string;
    callbackUrl?: string;
    error?: string;
}

const Login = (props: Props) => {
    const router = useRouter();
    const [error, setError] = React.useState<string | null>(null);
    const [errorText, setErrorText] = React.useState<string | null>(null);

    const handleGoogleSignIn = async () => {
        await signIn('google', {
            callbackUrl: props.callbackUrl || "/",
        });
    }

    useEffect(() => {
        switch (error) {
            case "CredentialsSignin": {
                setErrorText("Email ou mot de passe incorrect");
                break;
            }
            default:
                setErrorText(null);
        }
        console.log(error)
    }, [error, setErrorText]);
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
                                    const response = await signIn("credentials", {
                                        email: values.email,
                                        password: values.password,
                                        redirect: false,
                                        callbackUrl: props.callbackUrl || "/",
                                    });
                                    console.log(response);
                                    if (response.error) {
                                        setError(response.error);
                                    }
                                } catch (error) {
                                    console.log(values);
                                    console.error(error);
                                }
                            }}
                        >
                            {(formikProps) => (
                                <Form>
                                    {error ? <Text color={'red.500'}>{errorText}</Text> : null}
                                    <Field name='email'>
                                        {({ field }) => (
                                            <FormControl mt={4} isRequired>
                                                <FormLabel>Email</FormLabel>
                                                <Input type='email' {...field} placeholder='john@email.com' />
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name='password'>
                                        {({ field }) => (
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
                                        isLoading={formikProps.isSubmitting}>Se connecter</Button>
                                    <Button onClick={handleGoogleSignIn} textAlign={'center'} mt={4} w={'full'}>Se connecter avec Google</Button>
                                    <hr style={{ marginTop: 16 }} />
                                    <Button onClick={() => router.push("/auth/signup")} textAlign={'center'} mt={4} w={'full'} >Créer mon compte</Button>
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
