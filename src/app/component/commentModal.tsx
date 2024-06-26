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
    Toast,
    Textarea, useToast
} from "@chakra-ui/react";
import {Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import CreateComment from "@/app/actions/comment/create";
import {useSession} from "next-auth/react";

export default function CommentModal({isOpen, onClose, post, userId}) {
    let toast = useToast();
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Poster quelque chose</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Formik initialValues={{
                        text: '',
                        userId: post.userId,
                        postId: post.id,
                    }}
                            onSubmit={
                                async (values) => {
                                    try {
                                        await CreateComment(values, post.type)
                                        onClose()
                                        toast({
                                            title: "Commentaire posté",
                                            status: "success",
                                            duration: 3000,
                                            isClosable: true,
                                        });
                                    } catch (e) {
                                        console.error(e)
                                    }
                                }
                            }>
                        {(props) => (
                            <Form>

                                <Field name='text'>
                                    {({field, form}) => (
                                        <FormControl mt={4} isRequired>
                                            <FormLabel>Contenu</FormLabel>
                                            <Textarea type='text' {...field} max={1024}
                                                      placeholder="Il se passe quelque chose d'incroyable dans notre quartier !"/>
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