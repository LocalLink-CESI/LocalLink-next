import React, { useEffect, useState } from "react";
import {
    Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Textarea, useDisclosure
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikValues} from "formik";
import {useSession} from "next-auth/react";
import GetCities from "@/app/actions/cities/get";
import UpdateMe from "@/app/actions/users/update";
import {redirect} from "next/navigation";

export default function UserModal() {
    const {onOpen, onClose, isOpen} = useDisclosure();
    const [cities, setCities] = useState<{ id: number; name: string; }[]>([]);

    const session = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/auth/signin')
        },
    });

    const user = (session.data as any)?.session?.user;

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


    const handleSubmit = async (values) => {
        try {
            await UpdateMe(values);
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Button
                onClick={onOpen}
                flex={1}
                fontSize="sm"
                rounded="full"
                color="black"
                variant="brandPrimaryButton"
                px={10}
                boxShadow="0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            >
                Modifier mon profil
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Modification de votre profil</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Formik initialValues={{
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            bio: user.bio,
                            image: user.image,
                            cityId: user.cityId,
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
                                {/*<Field name="email">*/}
                                {/*    {({field}) => (*/}
                                {/*        <FormControl>*/}
                                {/*            <FormLabel>Email</FormLabel>*/}
                                {/*            <Input {...field} placeholder="Email"/>*/}
                                {/*        </FormControl>*/}
                                {/*    )}*/}
                                {/*</Field>*/}
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
