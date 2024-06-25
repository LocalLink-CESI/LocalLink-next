'use client'
import { GetPostWithId } from "@/app/actions/posts/get"
import { GetUserWithId } from "@/app/actions/users/get";
import PostCard from "@/components/Home/PostCard"
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Container, Flex, Heading, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { use, useEffect, useState } from "react"
import { shadow } from "../../../../theme";
import Image from "next/image";
import { FiFeather, FiShare, FiThumbsUp } from "react-icons/fi";

export default function Page({ params }: { params: { id: string } }) {
    const [post, setPost] = useState(null)
    const { data: session, status } = useSession()
    const user = (session as any)?.session?.user
    const router = useRouter()
    useEffect(() => {
        // Get post from the server actions
        const post = GetPostWithId(parseInt(params.id))
        post.then((data) => {
            // setPost(data)
            console.log(data, "data")
            const postUser = GetUserWithId((data as any).userId)
            postUser.then((user) => {
                setPost({ ...data, user })
                console.log(data, user, "data and user")
            })
        }).catch((e) => {
            console.error(e)
            // router.push('/404')
        })
    }, [setPost]
    )
    useEffect(() => {
        console.log(post, "post")
    }, [post])
    if (!post) return <div>Loading...</div>
    return (
        <main>
            <Container py='8' flex={1}>
                <Card maxW='xl' borderRadius={"20px"} boxShadow={shadow} >
                    <CardHeader>
                        <Flex gap='0'>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                <Avatar name={post.user.firstName + " " + post.user.lastName} src={post.user.image} flexShrink={1} />
                                <Box>
                                    <Heading size='sm'>{post.user.firstName + " " + post.user.lastName}</Heading>
                                    <Text fontSize="sm" color='gray.500'>{post.user.city.name}</Text>
                                </Box>
                            </Flex>
                        </Flex>
                    </CardHeader>
                    <CardBody style={{ paddingTop: 0 }}>
                        <Text fontSize={18} fontWeight={600} >
                            {post.title}
                        </Text>
                        <Text>
                            {post.text}
                        </Text>
                    </CardBody>
                    {post.image ? (<Box aspectRatio={"16/9"} mx={0} position={"relative"}>
                        <Image
                            fill={true}
                            src={post.image}
                            alt='Exemple image for now'
                        />
                    </Box>) : null}


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
                                {/* {post.interactions.likes} */} 0
                            </Button></Tooltip>
                        <Tooltip label="Commenter" aria-label="Commenter" placement="bottom">
                            <Button variant='brandGhostButton' leftIcon={<FiFeather />}>
                                {/* {post.interactions.comments} */} 0
                            </Button></Tooltip>
                        <Tooltip label="Partager" aria-label="Partager" placement="bottom">
                            <Button variant='brandGhostButton' leftIcon={<FiShare />}>
                            </Button></Tooltip>
                    </CardFooter>
                </Card>
            </Container>
        </main>
    )
}