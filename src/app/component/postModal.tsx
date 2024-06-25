import {
    Button, Checkbox, Flex,
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
import CreatePost from "@/app/actions/posts/create";
import {PostType, postTypeMap, postTypeValuesMap} from "@/helpers/database";
import {isDisabled} from "@chakra-ui/utils";
import GetCities from "@/app/actions/cities/get";
import {Category} from "@prisma/client";
import GetCategories from "@/app/actions/categories/get";
import {useSession} from "next-auth/react";

export default function PostModal({isOpen, onClose}) {
    const [type, setType] = useState(PostType.DEFAULT);
    const [categories, setCategories] = useState([])

    const handleTypeChange = (e) => {
        setType(e.target.value);
        console.log(e.target.value)
    }

    let session = useSession();
    let userId = null;
    if (session.status === "authenticated" && session.data.session) {
         userId = session.data.session?.user.id;
    }

    useEffect( () =>  {
        const fetchCategories = async () => {
            try {
                const fetchedCategories: Category[] = await GetCategories();
                // Convert bigint to number for city ids
                const convertedCategories = fetchedCategories.map(category => ({
                    id: Number(category.id),
                    name: category.name,
                }));
                setCategories(convertedCategories);
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };

        fetchCategories();
    }, [])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Poster quelque chose</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Formik initialValues={{
                        title: '',
                        text: '',
                        media: '',
                        userId: userId,
                        startAt: '',
                        endAt: '',
                        price: 0,
                        isDonation: false,
                        categoryId: 1,
                        type: PostType.DEFAULT,
                    }}
                            onSubmit={
                                async (values) => {
                                    try {
                                        await CreatePost(values, values.type)
                                        onClose()
                                    } catch (e) {
                                        console.error(e)
                                    }
                                }
                            }>
                        {(props) => (
                            <Form>
                                <Field name='title'>
                                    {({field, form}) => (
                                        <FormControl mt={4} isRequired>
                                            <FormLabel>Titre</FormLabel>
                                            <Input min={3} max={100} type='text' {...field}
                                                   placeholder='Un super post'/>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name='text'>
                                    {({field, form}) => (
                                        <FormControl mt={4} isRequired>
                                            <FormLabel>Contenu</FormLabel>
                                            <Textarea type='text' {...field} max={1024}
                                                      placeholder="Il se passe quelque chose d'incroyable dans notre quartier !"/>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name='media'>
                                    {({field, form}) => (
                                        <FormControl mt={4}>
                                            <FormLabel>Media</FormLabel>
                                            <Input type='text' {...field} placeholder='https://example.com/image.png'/>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name='type'>
                                    {({field, form}) => (
                                        <FormControl mt={4} isRequired>
                                            <FormLabel>Type de post</FormLabel>
                                            <Select
                                                name="type"
                                                id="type"
                                                onChange={(e) => {
                                                    handleTypeChange(e)
                                                    form.setFieldValue('type', e.target.value)
                                                }}
                                                value={form.values['type']}>
                                                {
                                                    (Object.keys(PostType) as Array<keyof typeof PostType>).map(type => (
                                                        <option key={type}
                                                                value={postTypeValuesMap[type]}>{postTypeMap[type]}</option>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>

                                {/* EVENEMENT */}
                                {props.values.type as string === PostType.EVENT && (
                                    <>
                                        <Field name='startAt'>
                                            {({field, form}) => (
                                                <FormControl mt={4} isRequired>
                                                    <FormLabel>Date de début</FormLabel>
                                                    <Input type='date' {...field} />
                                                </FormControl>
                                            )}
                                        </Field>

                                        <Field name='endAt'>
                                            {({field, form}) => (
                                                <FormControl mt={4} isRequired>
                                                    <FormLabel>Date de fin</FormLabel>
                                                    <Input type='date' {...field} />
                                                </FormControl>
                                            )}
                                        </Field>
                                    </>
                                )}

                                {/* VENTE OU DON */}
                                {props.values.type as string === PostType.SALE && (
                                    <>
                                    <Flex direction={"row"}>
                                        <Field name='isDonation'>
                                            {({field, form}) => (
                                                <FormControl mt={4}>
                                                    <FormLabel>Est ce un don ?</FormLabel>
                                                    <Checkbox name={"isDonation"} {...field}>{field.value ? "oui" : "non"}</Checkbox>
                                                </FormControl>
                                            )}
                                        </Field>

                                        <Field name='price'>
                                            {({field, form}) => (
                                                <FormControl mt={4} isRequired>
                                                    <FormLabel>Prix</FormLabel>
                                                    <Input  type='number' {...field} isDisabled={props.values.isDonation}/>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Flex>
                                        <Field name='categoryId'>
                                            {({field, form}) => (
                                                <FormControl mt={4} isRequired>
                                                    <FormLabel>Type de post</FormLabel>
                                                    <Select
                                                        name="categoryId"
                                                        id="categoryId"
                                                        onChange={form.handleChange}
                                                        value={form.values['categoryId']}>
                                                        {
                                                            categories.map(category => (
                                                                <option key={category.id}
                                                                        value={category.id}>{category.name}</option>
                                                            ))
                                                        }
                                                    </Select>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </>
                            )}

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