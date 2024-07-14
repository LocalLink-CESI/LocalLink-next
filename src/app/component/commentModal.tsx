import {
    Button,
    FormControl,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    useToast
} from "@chakra-ui/react";
import {Field, Form, Formik} from "formik";
import React from "react";
import CreateComment from "@/app/actions/comment/create";

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
                        userId: userId,
                        postId: post.id,
                    }}
                            onSubmit={
                                async (values) => {
                                    try {
                                        await CreateComment(values)
                                        onClose()
                                        toast({
                                            title: "Commentaire posté",
                                            status: "success",
                                            duration: 3000,
                                            isClosable: true,
                                        });
                                        // await 3000 ms
                                        setTimeout(() => {
                                            window.location.reload()
                                        }, 3000)
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