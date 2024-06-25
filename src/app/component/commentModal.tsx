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
import CreateComment from "@/app/actions/comment/create";

export default function CommentModal({isOpen, onClose, post}) {

    let session = useSession();
    let userId = null;
    if (session.status === "authenticated" && session.data.session) {
        userId = session.data.session?.user.id;
    }

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
                        postId: post.id,
                    }}
                            onSubmit={
                                async (values) => {
                                    try {
                                        await CreateComment(values, post.type)
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