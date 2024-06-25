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
    Textarea
} from "@chakra-ui/react";
import {Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import GetCities from "@/app/actions/cities/get";
import UpdateMe from "@/app/actions/users/update";

export default function UserModal({isOpen, onClose, post}) {
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

    let session = useSession();
    let userId = null;
    if (session.status === "authenticated" && session.data.session) {
        userId = session.data.session?.user.id;
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Modification de votre profil</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Formik initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        bio: '',
                        image: '',
                        cityId: 1,
                    }}
                            onSubmit={
                                async (values: FormData) => {
                                    try {
                                        await UpdateMe(values);
                                        onClose()
                                    } catch (e) {
                                        console.error(e)
                                    }
                                }
                            }>
                        {(props) => (
                            <Form>
                                <Field name='firstName'>
                                    {({field, form}) => (
                                        <FormControl mt={4} isRequired>
                                            <FormLabel>Prénom</FormLabel>
                                            <Input min={3} max={100} type='text' {...field}
                                                   placeholder='Prénom'/>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name='lastName'>
                                    {({field, form}) => (
                                        <FormControl mt={4} isRequired>
                                            <FormLabel>Nom</FormLabel>
                                            <Input min={3} max={100} type='text' {...field}
                                                   placeholder='Nom'/>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name='email'>
                                    {({field, form}) => (
                                        <FormControl mt={4} isRequired>
                                            <FormLabel>Email</FormLabel>
                                            <Input min={3} max={100} type='email' {...field}
                                                   placeholder='Email'/>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name='bio'>
                                    {({field, form}) => (
                                        <FormControl mt={4} isRequired>
                                            <FormLabel>Bio</FormLabel>
                                            <Textarea min={3} max={1000} type='text' {...field}
                                                      placeholder='Bio'/>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name='image'>
                                    {({field, form}) => (
                                        <FormControl mt={4} isRequired>
                                            <FormLabel>Avatar</FormLabel>
                                            <Input min={3} max={1000} type='text' {...field}
                                                   placeholder='Avatar'/>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field>
                                    {({field, form}) => (
                                        <FormControl mt={4} isRequired>
                                            <FormLabel>Ville</FormLabel>
                                            <Select
                                                name="cityId"
                                                id="cityId"
                                                onChange={form.handleChange}
                                                value={form.values['cityId']}>
                                                {
                                                    cities.map(city => (
                                                        <option key={city.id}
                                                                value={Number(city.id)}>{city.name}</option>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>

                                <ModalFooter justifyContent={'end'}>
                                    <>
                                        <Button mr={3} rounded={'md'}
                                                color={'black'}
                                                isLoading={props.isSubmitting}
                                                variant={"brandPrimaryButton"} type="submit">
                                            Poster
                                        </Button>
                                        <Button onClick={onClose}>Annuler</Button>
                                    </>
                                </ModalFooter>
                            </Form>
                        )}
                    </Formik>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}