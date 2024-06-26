import {
    Button,
    Checkbox,
    Flex,
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
    Text,
    Textarea,
    useDisclosure, Toast, useToast
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikValues } from "formik";
import React, { useEffect, useState } from "react";
import CreatePost from "@/app/actions/posts/create";
import { PostType, postTypeMap, postTypeValuesMap } from "@/helpers/database";
import { Category } from "@prisma/client";
import GetCategories from "@/app/actions/categories/get";
import { useSession } from "next-auth/react";

export default function PostModal() {
    const { onOpen, onClose, isOpen } = useDisclosure();

    let toast = useToast();


    const [type, setType] = useState(PostType.DEFAULT);
    const [categories, setCategories] = useState([])
    const [mediaPreview, setMediaPreview] = useState('');

    const handleTypeChange = (e) => {
        setType(e.target.value);
    }

    let session = useSession();
    let userId = null;
    if (session.status === "authenticated" && (session.data as any).session) {
        userId = (session.data as any).session?.user.id;
    }

    useEffect(() => {
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
        <>
            <Button
                onClick={onOpen}
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                color={'black'}
                variant={"brandPrimaryButton"}
                px={10}
                boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}>
                Poster quelque chose !
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Poster quelque chose</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Formik initialValues={{
                            title: '',
                            text: '',
                            media: null,
                            userId: userId,
                            startAt: '',
                            endAt: '',
                            price: 0,
                            isDonation: false,
                            categoryId: 1,
                            localisation: '',
                            type: PostType.DEFAULT,
                        }}
                            onSubmit={
                                async (values: FormikValues) => {
                                    try {
                                        await CreatePost(values, values.type)

                                        toast({
                                            title: "Succès",
                                            description: "Post créé avec succès",
                                            status: "success",
                                            duration: 3000,
                                            isClosable: true,
                                        });

                                        // await 1000

                                        setTimeout(() => {
                                            window.location.reload();
                                        }, 1000);

                                        onClose()
                                    } catch (e) {
                                        console.error(e)
                                    }
                                }
                            }>
                            {(props) => (
                                <Form>
                                    <Field name='title'>
                                        {({ field, form }) => (
                                            <FormControl mt={4} isRequired>
                                                <FormLabel>Titre</FormLabel>
                                                <Input min={3} max={100} type='text' {...field}
                                                    placeholder='Un super post' />
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name='text'>
                                        {({ field, form }) => (
                                            <FormControl mt={4} isRequired>
                                                <FormLabel>Contenu</FormLabel>
                                                <Textarea type='text' {...field} max={1024}
                                                    placeholder="Il se passe quelque chose d'incroyable dans notre quartier !" />
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name='media'>
                                        {({ field, form }) => (
                                            <FormControl mt={4}>
                                                <FormLabel>Media {mediaPreview == 'error' &&
                                                    (<Text as={'span'} bg={"red.500"} bgClip="text">
                                                        1 mo maximum !</Text>)}
                                                </FormLabel>
                                                <input
                                                    name='media'
                                                    accept='image/png'
                                                    id='media'
                                                    type='file'
                                                    onChange={(e) => {
                                                        const fileReader = new FileReader();
                                                        fileReader.onload = () => {
                                                            console.log(e.target.files[0].size)
                                                            console.log(e.target.files[0].size < 1000000)
                                                            if (fileReader.readyState == 2 && e.target.files[0].size < 1000000) {
                                                                form.setFieldValue('media', fileReader.result);
                                                                // @ts-ignore
                                                                setMediaPreview(fileReader.result);
                                                            } else {
                                                                setMediaPreview("error");
                                                            }
                                                        };
                                                        fileReader.readAsDataURL(e.target.files[0]);
                                                    }}
                                                />
                                                {mediaPreview != '' && mediaPreview != 'error' &&
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img src={mediaPreview} alt="Image preview"
                                                        style={{ width: '100px' }} />
                                                }


                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name='type'>
                                        {({ field, form }) => (
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
                                                {({ field, form }) => (
                                                    <FormControl mt={4} isRequired>
                                                        <FormLabel>Date de début</FormLabel>
                                                        <Input type='date' {...field} />
                                                    </FormControl>
                                                )}
                                            </Field>

                                            <Field name='endAt'>
                                                {({ field, form }) => (
                                                    <FormControl mt={4} isRequired>
                                                        <FormLabel>Date de fin</FormLabel>
                                                        <Input type='date' {...field} />
                                                    </FormControl>
                                                )}
                                            </Field>

                                            <Field name='localisation'>
                                                {({ field, form }) => (
                                                    <FormControl mt={4} isRequired>
                                                        <FormLabel>Où se passe l&apos;événement ?</FormLabel>
                                                        <Input type='text' {...field} />
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
                                                    {({ field, form }) => (
                                                        <FormControl mt={4}>
                                                            <FormLabel>Est ce un don ?</FormLabel>
                                                            <Checkbox
                                                                name={"isDonation"} {...field}>{field.value ? "oui" : "non"}</Checkbox>
                                                        </FormControl>
                                                    )}
                                                </Field>

                                                <Field name='price'>
                                                    {({ field, form }) => (
                                                        <FormControl mt={4} isRequired>
                                                            <FormLabel>Prix</FormLabel>
                                                            <Input type='number' {...field}
                                                                isDisabled={props.values.isDonation} />
                                                        </FormControl>
                                                    )}
                                                </Field>
                                            </Flex>
                                            <Field name='categoryId'>
                                                {({ field, form }) => (
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
        </>

    );
}