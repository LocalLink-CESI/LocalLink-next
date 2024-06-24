'use client';

import React, {useEffect, useState} from "react";
import CreateUser from "@/app/actions/users/create";
import GetCities from "@/app/actions/cities/get";

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
import {brandPrimary} from '../../theme';

type Props = {
    error?: string;
    callbackUrl?: string;
}

interface FormData {
    firstName: string;
    lastName: string;
    password: string;
    bio: string;
    cityId: number;
    avatar: string;
    email: string;
}

interface City {
    id: bigint;
    name: string;
    zipCode: string;
}

// const RegisterForm = (props: Props) => {
//     const [formDataOld, setFormDataOld] = useState<FormDataOld>({
//         firstName: "",
//         lastName: "",
//         password: "",
//         bio: "",
//         cityId: 0,
//         avatar: "",
//         email: ""
//     });

//     const [cities, setCities] = useState<{ id: number; name: string; }[]>([]);

//     useEffect(() => {
//         const fetchCities = async () => {
//             try {
//                 const fetchedCities: City[] = await GetCities();
//                 // Convert bigint to number for city ids
//                 const convertedCities = fetchedCities.map(city => ({
//                     id: Number(city.id),
//                     name: city.name,
//                 }));
//                 setCities(convertedCities);
//             } catch (error) {
//                 console.error("Error fetching cities:", error);
//             }
//         };

//         fetchCities();
//     }, []);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         setFormDataOld({
//             ...formDataOld,
//             [e.target.name]: e.target.value
//         });
//     }

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         try {
//             await CreateUser(formDataOld);

//             window.alert("User created successfully");
//             window.location.href = "/auth/signin";
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     return (
//         <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//             <FormControl isRequired display='flex' flexDirection='column' gap='10px'>
//                 <FormLabel>First name</FormLabel>
//                 <Input type='text' onChange={handleChange} name='firstName' />

//                 <FormLabel>Last name</FormLabel>
//                 <Input type='text' onChange={handleChange} name='lastName' />

//                 <FormLabel>Email</FormLabel>
//                 <Input type='email' onChange={handleChange} name='email' />

//                 <FormLabel>Password</FormLabel>
//                 <Input type='password' onChange={handleChange} name='password' />

//                 <FormLabel>Bio</FormLabel>
//                 <Input type='text' onChange={handleChange} name='bio' />

//                 <FormLabel>City</FormLabel>
//                 <Select onChange={handleChange} name='cityId'>
//                     <option value="">Select a city</option>
//                     {cities.map(city => (
//                         <option key={city.id} value={city.id}>{city.name}</option>
//                     ))}
//                 </Select>

//                 <FormLabel>Avatar</FormLabel>
//                 <Input type='text' onChange={handleChange} name='avatar' />

//             </FormControl>

//             <Button type='submit'>Submit</Button>

//         </form>
//     )
// }

// export default RegisterForm;


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
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        password: "",
        bio: "",
        cityId: 0,
        avatar: "",
        email: ""
    });

    return (
        <Icon
            width={useBreakpointValue({base: '100%', md: '40vw', lg: '30vw'})}
            zIndex={useBreakpointValue({base: -1, md: -1, lg: 0})}
            height="560px"
            viewBox="0 0 528 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <circle cx="71" cy="61" r="111" fill="#F56565"/>
            <circle cx="244" cy="106" r="139" fill="#ED64A6"/>
            <circle cy="291" r="139" fill="#ED64A6"/>
            <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936"/>
            <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B"/>
            <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78"/>
            <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1"/>
        </Icon>
    )
}

export function SignUp() {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        password: "",
        bio: "",
        cityId: 0,
        avatar: "",
        email: ""
    });
    const [cities, setCities] = useState<{ id: number; name: string; }[]>([]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const fetchedCities: City[] = await GetCities();
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await CreateUser(formData);

            window.alert("User created successfully");
            window.location.href = "/auth/signin";
        } catch (error) {
            console.error(error);
        }
    }

    const labelStyle = {fontFamily: "Montserrat", fontWeight: 800, margin: 0}
    return (
        <Box position={'relative'}>
            <Container
                as={SimpleGrid}
                maxW={'7xl'}
                columns={{base: 1, md: 2}}
                spacing={{base: 10, lg: 32}}
                py={{base: 10, sm: 20, lg: 32}}>
                <Stack spacing={{base: 10, md: 20}}>
                    <Heading
                        lineHeight={1.1}
                        fontSize={{base: '3xl', sm: '4xl', md: '5xl', lg: '6xl'}}>
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
                                    size={useBreakpointValue({base: 'md', md: 'lg'})}
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
                        <Text fontFamily={'heading'} fontSize={{base: '4xl', md: '6xl'}}>
                            +
                        </Text>
                        <Flex
                            align={'center'}
                            justify={'center'}
                            fontFamily={'heading'}
                            fontSize={{base: 'xs', md: 'sm'}}
                            bg={'gray.800'}
                            color={'white'}
                            rounded={'full'}
                            minWidth={useBreakpointValue({base: '44px', md: '60px'})}
                            minHeight={useBreakpointValue({base: '44px', md: '60px'})}
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
                    p={{base: 4, sm: 6, md: 8}}
                    spacing={{base: 8}}
                    maxW={{lg: 'lg'}}>
                    <Stack spacing={4}>
                        <Heading
                            color={'gray.800'}
                            lineHeight={1.1}
                            fontSize={{base: '2xl', sm: '3xl', md: '4xl'}}>
                            Rejoignez <Text as={'span'} bg={brandPrimary} bgClip="text">L</Text>ocal<Text as={'span'}
                                                                                                          bg={brandPrimary}
                                                                                                          bgClip="text">L</Text>ink
                            <Text as={'span'} bg={brandPrimary} bgClip="text">!</Text>
                        </Heading>
                        <Text color={'gray.500'} fontSize={{base: 'sm', sm: 'md'}}>
                            Votre quartier vous attend ! N&apos;hésitez plus et rejoignez-nous pour participer à la vie
                            de votre quartier.
                        </Text>
                    </Stack>
                    <Box as={'form'} mt={0}>
                        <Stack spacing={4}>
                            <FormLabel style={labelStyle}>Nom</FormLabel>
                            <Input
                                placeholder="Dupont"
                                name="lastName"
                                max={50}
                                min={1}
                                onChange={(e) => {
                                    let form = formData;
                                    form.lastName = e.target.value;
                                    setFormData(form);
                                }}
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                            />
                            <FormLabel style={labelStyle}>Prénom</FormLabel>
                            <Input
                                placeholder="Jean"
                                name="firstName"
                                type="text"
                                max={50}
                                min={1}
                                onChange={(e) => {
                                    let form = formData;
                                    form.firstName = e.target.value;
                                    setFormData(form);
                                }}
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                            />
                            <FormLabel style={labelStyle}>Email</FormLabel>
                            <Input
                                placeholder="monemail@service.com"
                                name="email"
                                type="email"
                                onChange={(e) => {
                                    let form = formData;
                                    form.email = e.target.value;
                                    setFormData(form);
                                }}
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                            />
                            <FormLabel style={labelStyle}>Mot de passe</FormLabel>
                            <Input
                                placeholder="MonMotDePasse"
                                type="password"
                                name="password"
                                bg={'gray.100'}
                                onChange={(e) => {
                                    let form = formData;
                                    form.password = e.target.value;
                                    setFormData(form);
                                }}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                            />
                            <FormLabel style={labelStyle}>Ville</FormLabel>

                            <Select onChange={handleChange} name='cityId'>
                                <option value="">Selectionner une ville</option>
                                {cities.map(city => (
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))}
                            </Select>
                        </Stack>
                        <Button
                            onClick={handleSubmit}
                            fontFamily={'heading'}
                            mt={8}
                            w={'full'}
                            bg={brandPrimary}
                            color={'white'}
                            _hover={{
                                bgGradient: 'brandprimary.700',
                                boxShadow: 'xl',
                            }}>
                            Envoyer
                        </Button>
                    </Box>
                    form
                </Stack>
            </Container>
            <Blur position={'absolute'} top={-10} left={-10} style={{filter: 'blur(70px)'}}/>
        </Box>
    )
}

export default SignUp;