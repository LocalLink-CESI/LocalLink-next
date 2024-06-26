'use client';

import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardHeader,
    FormControl,
    FormLabel,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Select,
    Stack,
    Textarea,
    ButtonGroup,
    PopoverHeader,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
    PopoverFooter, useToast,
} from '@chakra-ui/react'
import {Heading, Text} from '@chakra-ui/layout'
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {Field, Form, Formik, FormikValues} from "formik";
import React, {useEffect, useState} from "react";
import GetCities from "@/app/actions/cities/get";
import ProfileLoading from "@/app/profile/loading";
import {DeleteUserWithId} from "@/app/actions/users/delete";
import {UpdateUserWithId} from "@/app/actions/users/update";


export default function Account() {

    let toast = useToast();

    const router = useRouter();

    const session = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/auth/signin')
        },
    });

    const [cities, setCities] = useState<{ id: number; name: string; }[]>([]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const fetchedCities = await GetCities();
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

    if (session.data) {

        const user = (session.data as any)?.session?.user;

        const handleSubmit = async (values: FormikValues) => {
            try {
                await UpdateUserWithId(user.id, values);

                toast({
                    title: "Compte mis à jour",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } catch (error) {
                console.error(error);
            }
        };

        const handleAccountDeactivation = async () => {
            try {
                await DeleteUserWithId(user.id)

                toast({
                    title: "Compte désactivé",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });

                setTimeout(() => {
                    window.location.reload();
                }, 1000);

                await signOut();
            } catch (error) {
                console.error(error);

                toast({
                    title: "Une erreur s'est produite",
                    description: "Impossible de désactiver le compte",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        };

        if (session.status === 'loading') return ProfileLoading();

        return (
            <Stack spacing={4} direction='column'>
                <Card>
                    <CardHeader>
                        <Stack spacing={4} direction='column'>
                            <Avatar name={user.firstName + " " + user.lastName} src={user.image}/>
                            <Heading size='md'>Compte</Heading>
                            <Text fontSize='sm' color='gray.500'>Gérez vos informations personnelles</Text>
                        </Stack>
                    </CardHeader>
                </Card>

                <Card>
                    <CardBody>
                        <Formik initialValues={{
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            bio: user.bio,
                            image: user.image,
                            cityId: user.cityId,
                        }} onSubmit={handleSubmit}>
                            <Form>
                                <Stack spacing={4} direction='column'>
                                    <Stack spacing={4} direction='row'>
                                        <Field name="firstName">
                                            {({field}) => (
                                                <FormControl>
                                                    <FormLabel>Prénom</FormLabel>
                                                    <Input {...field} placeholder="Prénom"/>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="lastName">
                                            {({field}) => (
                                                <FormControl>
                                                    <FormLabel>Nom</FormLabel>
                                                    <Input {...field} placeholder="Nom"/>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Stack>
                                    {/*<Field name="email">*/}
                                    {/*    {({field}) => (*/}
                                    {/*        <FormControl>*/}
                                    {/*            <FormLabel>Email</FormLabel>*/}
                                    {/*            <Input {...field} placeholder="Email"/>*/}
                                    {/*        </FormControl>*/}
                                    {/*    )}*/}
                                    {/*</Field>*/}
                                    <Stack spacing={4} direction='row'>
                                        <Field name="image">
                                            {({field}) => (
                                                <FormControl>
                                                    <FormLabel>Image</FormLabel>
                                                    <Input {...field} placeholder="Image"/>
                                                </FormControl>
                                            )}
                                        </Field>

                                        <Field name="cityId">
                                            {({field}) => (
                                                <FormControl>
                                                    <FormLabel>Ville</FormLabel>
                                                    <Select {...field} placeholder="Ville">
                                                        {cities.map(city => (
                                                            <option key={city.id} value={city.id}>{city.name}</option>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Stack>

                                    <Field name="bio">
                                        {({field}) => (
                                            <FormControl>
                                                <FormLabel>Bio</FormLabel>
                                                <Textarea {...field} placeholder="Bio"/>
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Button type='submit'>Enregistrer</Button>
                                </Stack>
                            </Form>
                        </Formik>
                    </CardBody>
                </Card>

                <Stack direction='row' spacing={4} justifyContent='center'>
                    <Button onClick={() => signOut()}>Déconnexion</Button>
                    <Popover>
                        <PopoverTrigger>
                            <Button colorScheme='red'>Désactiver mon compte</Button>
                        </PopoverTrigger>


                        <PopoverContent>
                            <PopoverHeader fontWeight='semibold'>Confirmation</PopoverHeader>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody>
                                Êtes-vous sûr de vouloir désactiver votre compte ?
                            </PopoverBody>
                            <PopoverFooter display='flex' justifyContent='flex-end'>
                                <ButtonGroup size='sm'>
                                    <Button onClick={() => handleAccountDeactivation()} colorScheme='red'>Désactiver</Button>
                                </ButtonGroup>
                            </PopoverFooter>
                        </PopoverContent>
                    </Popover>
                </Stack>
            </Stack>
        )
    }

    return null;
}