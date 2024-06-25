import { useUserStore } from "@/providers/user-store-provider";
import { Image } from "@chakra-ui/next-js";
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { FiFeather, FiMoreHorizontal, FiShare, FiThumbsUp } from "react-icons/fi";
import { shadow, shadowHover } from "../../../theme";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GetUserWithId } from "@/app/actions/users/get";
import { useEffect, useState } from "react";

export default function PostCard({ post }: { post: any }) {
    // For now all posts will just be from the current user while theres no backend to fetch details from a user's id
    const router = useRouter()
    const [postUser, setPostUser] = useState(null)
    // console.log(postUser)
    // const relativeDate = (date: Date) => {
    //     const diff = new Date().getTime() - date.getTime()
    //     const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    //     if (days > 0) {
    //         return `Il y a ${days} jours`
    //     }
    //     const hours = Math.floor(diff / (1000 * 60 * 60))
    //     if (hours > 0) {
    //         return `Il y a ${hours} heures`
    //     }
    //     const minutes = Math.floor(diff / (1000 * 60))
    //     if (minutes >= 0) {
    //         return `Il y a ${minutes} minutes`
    //     }
    //     return ""
    // }
    console.log(post, "post")
    useEffect(() => {
        const postUserFetch = GetUserWithId(post.userId)
        postUserFetch.then((data) => {
            setPostUser(data)
        }).catch((e) => {
            console.error(e)
            // router.push('/404')
        })
    }, [setPostUser])
    return (
        <Link href={"/posts/" + post.id}>
            <Card maxW='xl' borderRadius={"20px"} boxShadow={shadow} cursor={"pointer"} transition={"box-shadow 0.2s ease-in-out"} _hover={{ boxShadow: shadowHover }}>
                <CardHeader>
                    <Flex gap='0'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar name={postUser?.firstName + " " + postUser?.lastName} src={postUser?.image} flexShrink={1} />
                            <Box>
                                <Heading size='sm'>{postUser?.firstName + " " + postUser?.lastName}</Heading>
                                <Text fontSize="sm" color='gray.500'>{postUser?.city.name}</Text>
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
        </Link>
    )
}