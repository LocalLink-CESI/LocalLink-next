'use client';

import React, { useEffect, useState } from "react";
import CreateUserFromModel from "@/app/actions/users/create";
import GetCities from "@/app/actions/cities/get";
import { Formik, Field, Form } from 'formik';

import {
    Flex,
    Stack,
    Heading,
    Text,
    Container,
    SimpleGrid,
    Avatar,
    AvatarGroup,
    useBreakpointValue,
    IconProps,
    Icon,
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select
} from '@chakra-ui/react'
import { brandPrimary } from '../../theme';
import { useRouter } from "next/navigation";
import { Role } from "@/models/User";



const avatars = [
    {
        name: 'Ryan Florence',
        url: 'https://bit.ly/ryan-florence',
    },
    {
        name: 'Segun Adebayo',
        url: 'https://bit.ly/sage-adebayo',
    },
    {
        name: 'Kent Dodds',
        url: 'https://bit.ly/kent-c-dodds',
    },
    {
        name: 'Prosper Otemuyiwa',
        url: 'https://bit.ly/prosper-baba',
    },
    {
        name: 'Christian Nwamba',
        url: 'https://bit.ly/code-beast',
    },
]

const Blur = (props: IconProps) => {
    return (
        <Icon
            width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
            zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
            height="560px"
            viewBox="0 0 528 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <circle cx="71" cy="61" r="111" fill="#F56565" />
            <circle cx="244" cy="106" r="139" fill="#ED64A6" />
            <circle cy="291" r="139" fill="#ED64A6" />
            <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
            <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
            <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
            <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
        </Icon>
    )
}

export function SignUp() {
    const [cities, setCities] = useState<{ id: number; name: string; }[]>([]);
    const router = useRouter();
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const fetchedCities = await GetCities();
                // Convert bigint to number for city ids
                const convertedCities = fetchedCities.map(city => ({
                    id: Number(city.id),
                    name: city.name,
                }));
                setCities(convertedCities);
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };

        fetchCities();
    }, []);
    return (
        <Box position={'relative'}>
            <Container
                as={SimpleGrid}
                maxW={'7xl'}
                columns={{ base: 1, md: 2 }}
                spacing={{ base: 10, lg: 32 }}
                py={{ base: 10, sm: 20, lg: 32 }}>
                <Stack spacing={{ base: 10, md: 20 }}>
                    <Heading
                        zIndex={1}
                        lineHeight={1.1}
                        fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
                        Rejoingez votre quartier{' '}
                        <Text as={'span'} bg={brandPrimary} bgClip="text">
                            &
                        </Text>{' '}
                        Participez à sa vie
                    </Heading>
                    <Stack direction={'row'} spacing={4} align={'center'}>
                        <AvatarGroup>
                            {avatars.map((avatar) => (
                                <Avatar
                                    key={avatar.name}
                                    name={avatar.name}
                                    src={avatar.url}
                                    // eslint-disable-next-line react-hooks/rules-of-hooks
                                    size={useBreakpointValue({ base: 'md', md: 'lg' })}
                                    position={'relative'}
                                    zIndex={2}
                                    _before={{
                                        content: '""',
                                        width: 'full',
                                        height: 'full',
                                        rounded: 'full',
                                        transform: 'scale(1.125)',
                                        bg: brandPrimary,
                                        position: 'absolute',
                                        zIndex: -1,
                                        top: 0,
                                        left: 0,
                                    }}
                                />
                            ))}
                        </AvatarGroup>
                        <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
                            +
                        </Text>
                        <Flex
                            align={'center'}
                            justify={'center'}
                            fontFamily={'heading'}
                            fontSize={{ base: 'xs', md: 'sm' }}
                            bg={'gray.800'}
                            color={'white'}
                            rounded={'full'}
                            minWidth={useBreakpointValue({ base: '44px', md: '60px' })}
                            minHeight={useBreakpointValue({ base: '44px', md: '60px' })}
                            position={'relative'}
                            _before={{
                                content: '""',
                                width: 'full',
                                height: 'full',
                                rounded: 'full',
                                transform: 'scale(1.125)',
                                bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                                position: 'absolute',
                                zIndex: -1,
                                top: 0,
                                left: 0,
                            }}>
                            VOUS!
                        </Flex>
                    </Stack>
                </Stack>
                <Stack
                    bg={'gray.50'}
                    rounded={'xl'}
                    p={{ base: 4, sm: 6, md: 8 }}
                    spacing={{ base: 8 }}
                    maxW={{ lg: 'lg' }}>
                    <Stack spacing={4}>
                        <Heading
                            zIndex={1}
                            color={'gray.800'}
                            lineHeight={1.1}
                            fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                            Rejoignez <Text as={'span'} bg={brandPrimary} bgClip="text">L</Text>ocal<Text as={'span'}
                                bg={brandPrimary}
                                bgClip="text">L</Text>ink
                            <Text as={'span'} bg={brandPrimary} bgClip="text">!</Text>
                        </Heading>
                        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                            Votre quartier vous attend ! N&apos;hésitez plus et rejoignez-nous pour participer à la vie
                            de votre quartier.
                        </Text>
                    </Stack>
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
                                let user = await CreateUserFromModel({
                                    ...values,
                                    bio: "",
                                    image: "",
                                    role: Role.USER,
                                }, values.password);
                                // Put the user in the next session and redirect to the signin page to login
                                router.push("/auth/signin")
                            } catch (error) {
                            }
                        }}
                    >
                        {(props) => (

                            <Form>
                                <Field name='firstName'>
                                    {({ field, form }) => (
                                        <FormControl isRequired>
                                            <FormLabel>Prénom</FormLabel>
                                            <Input {...field} placeholder='John' />
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name='lastName'>
                                    {({ field, form }) => (
                                        <FormControl mt={4} isRequired>
                                            <FormLabel>Nom</FormLabel>
                                            <Input {...field} placeholder='Doe' />
                                        </FormControl>
                                    )}
                                </Field>

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

                                <Field>
                                    {({ field, form }) => (
                                        <FormControl mt={4} isRequired>
                                            <FormLabel>Ville</FormLabel>
                                            <Select
                                                name="cityId"
                                                id="cityId"
                                                onChange={form.handleChange}
                                                value={form.values['cityId']}>
                                                {
                                                    cities.map(city => (
                                                        <option key={city.id} value={Number(city.id)}>{city.name}</option>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>

                                <Button
                                    textAlign={'center'}
                                    mt={8}
                                    w={'full'}
                                    type='submit'
                                    colorScheme={'blue'}
                                    isLoading={props.isSubmitting}>Créer mon compte</Button>
                                <hr style={{ marginTop: 16 }} />

                                <Button onClick={() => router.push("/auth/signin")} textAlign={'center'} mt={4} w={'full'} >Déjà un compte ?</Button>
                            </Form>
                        )}
                    </Formik>
                </Stack>
            </Container>
            <Blur zIndex={0} position={'absolute'} top={-10} left={-10} style={{ filter: 'blur(70px)' }} />
        </Box>
    )
}

export default SignUp;