'use client';
import React, {useEffect, useState} from "react";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Textarea,
    useDisclosure, Toast, useToast
} from "@chakra-ui/react";
import {Field, Form, Formik, FormikValues} from "formik";
import {useSession} from "next-auth/react";
import GetCities from "@/app/actions/cities/get";
import {UpdateUserWithId} from "@/app/actions/users/update";
import User from "@/models/User";

export default function UpdateUserModal({user}: { user: User }) {
    const {onOpen, onClose, isOpen} = useDisclosure();

    let toast = useToast();

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

    const session = useSession({
        required: true,
    });

    const sessionUser = (session.data as any)?.session?.user;

    const role = sessionUser.role;

    if (role !== "ADMIN" && sessionUser.id !== user.id) return null;

    const handleSubmit = async (values : FormikValues) => {
        try {
            await UpdateUserWithId(user.id, values);

            toast({
                title: "Profil mis à jour",
                description: "Le profil a été mis à jour avec succès",
                status: "success",
                duration: 9000,
                isClosable: true,
            });

            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Button
                onClick={onOpen}
            >
                Modifier le profil
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Modification du profil de {user.firstName} {user.lastName}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Formik initialValues={{
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            bio: user.bio,
                            image: user.image,
                            cityId: user.cityId,
                            role: user.role
                        }} onSubmit={handleSubmit}>
                            <Form>
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
                                <Field name="email">
                                    {({field}) => (
                                        <FormControl>
                                            <FormLabel>Email</FormLabel>
                                            <Input {...field} placeholder="Email"/>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="bio">
                                    {({field}) => (
                                        <FormControl>
                                            <FormLabel>Bio</FormLabel>
                                            <Textarea {...field} placeholder="Bio"/>
                                        </FormControl>
                                    )}
                                </Field>
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
                                <Field name="role">
                                    {({field}) => (
                                        <FormControl>
                                            <FormLabel>Rôle</FormLabel>
                                            <Select {...field} placeholder="Rôle">
                                                <option value="USER">Utilisateur</option>
                                                <option value="ADMIN">Administrateur</option>
                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>
                                <ModalFooter>
                                    <Button type="submit" colorScheme="blue" mr={3}>
                                        Enregistrer
                                    </Button>
                                    <Button onClick={onClose}>Annuler</Button>
                                </ModalFooter>
                            </Form>
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
