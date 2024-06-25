import { useUserStore } from "@/providers/user-store-provider";
import { Image } from "@chakra-ui/next-js";
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { FiFeather, FiMoreHorizontal, FiShare, FiThumbsUp } from "react-icons/fi";
import { shadow } from "../../../theme";

export default function PostCard({ post }: { post: any }) {
    // For now all posts will just be from the current user while theres no backend to fetch details from a user's id
    const user = useUserStore((state) => state)
    let postUser = user
    if (!postUser) { postUser = user }
    // console.log(postUser)
    const relativeDate = (date: Date) => {
        const diff = new Date().getTime() - date.getTime()
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        if (days > 0) {
            return `Il y a ${days} jours`
        }
        const hours = Math.floor(diff / (1000 * 60 * 60))
        if (hours > 0) {
            return `Il y a ${hours} heures`
        }
        const minutes = Math.floor(diff / (1000 * 60))
        if (minutes >= 0) {
            return `Il y a ${minutes} minutes`
        }
        return ""
    }
    return (
        <Card maxW='xl' borderRadius={"20px"} boxShadow={shadow}>
            <CardHeader>
                <Flex gap='0'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name={postUser.name} src={postUser.avatar} flexShrink={1} />
                        <Box>
                            <Heading size='sm'>{postUser.name}</Heading>
                            <Text fontSize="sm" color='gray.500'>{postUser.location + " • " + relativeDate(post.createdOn)}</Text>
                        </Box>
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody style={{ paddingTop: 0 }}>
                <Text>
                    {post.content}
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
                        {post.interactions.likes}
                    </Button></Tooltip>
                <Tooltip label="Commenter" aria-label="Commenter" placement="bottom">
                    <Button variant='brandGhostButton' leftIcon={<FiFeather />}>
                        {post.interactions.comments}
                    </Button></Tooltip>
                <Tooltip label="Partager" aria-label="Partager" placement="bottom">
                    <Button variant='brandGhostButton' leftIcon={<FiShare />}>
                    </Button></Tooltip>
            </CardFooter>
        </Card>
    )
}