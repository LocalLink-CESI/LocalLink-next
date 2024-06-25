'use client';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { GetPostWithId } from "@/app/actions/posts/get";
import { GetUserWithId } from "@/app/actions/users/get";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Container,
    Flex,
    Heading,
    Text,
    Tooltip
} from "@chakra-ui/react";
import Image from "next/image";
import { FiFeather, FiShare, FiThumbsUp } from "react-icons/fi";
import { shadow } from "../../../../theme";

export default function Page({ params }: { params: { id: string } }) {
    const [post, setPost] = useState(null);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postData = await GetPostWithId(parseInt(params.id));
                const postUser = await GetUserWithId(postData.userId);
                setPost({ ...postData, user: postUser });
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [params.id]);

    if (!post) return <div>Loading...</div>;

    return (
        <main>
            <Container py='8' flex={1}>
                <Card maxW='xl' borderRadius="20px" boxShadow={shadow}>
                    <CardHeader>
                        <Flex gap='0'>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                <Avatar
                                    name={`${post.user.firstName} ${post.user.lastName}`}
                                    src={post.user.image}
                                    flexShrink={1}
                                />
                                <Box>
                                    <Heading size='sm'>
                                        {`${post.user.firstName} ${post.user.lastName}`}
                                    </Heading>
                                    <Text fontSize="sm" color='gray.500'>
                                        {post.user.city.name}
                                    </Text>
                                </Box>
                            </Flex>
                        </Flex>
                    </CardHeader>
                    <CardBody style={{ paddingTop: 0 }}>
                        <Text fontSize={18} fontWeight={600}>
                            {post.title}
                        </Text>
                        <Text>
                            {post.text}
                        </Text>
                    </CardBody>
                    {post.image && (
                        <Box aspectRatio="16/9" mx={0} position="relative">
                            <Image
                                fill={true}
                                src={post.image}
                                alt='Example image for now'
                            />
                        </Box>
                    )}
                    <CardFooter
                        justify='center'
                        flexWrap='wrap'
                        sx={{
                            '& > button': {
                                minW: '136px',
                            },
                        }}
                    >
                        <Tooltip label="J'aime" aria-label="J'aime" placement="bottom">
                            <Button variant='brandGhostButton' leftIcon={<FiThumbsUp />}>
                                0
                            </Button>
                        </Tooltip>
                        <Tooltip label="Commenter" aria-label="Commenter" placement="bottom">
                            <Button variant='brandGhostButton' leftIcon={<FiFeather />}>
                                0
                            </Button>
                        </Tooltip>
                        <Tooltip label="Partager" aria-label="Partager" placement="bottom">
                            <Button variant='brandGhostButton' leftIcon={<FiShare />} />
                        </Tooltip>
                    </CardFooter>
                </Card>
            </Container>
        </main>
    );
}
