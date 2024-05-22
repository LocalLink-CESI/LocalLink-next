import { Image } from "@chakra-ui/next-js";
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { FiFeather, FiMoreHorizontal, FiShare, FiThumbsUp } from "react-icons/fi";

export default function HomeCard({ post }: { post: any }) {
    return (
        <Card maxW='xl' borderRadius={"20px"} shadow={"rgba(0, 0, 0, 0.12) 0px 3px 6px, rgba(0, 0, 0, 0.19) 0px 3px 6px;"}>
            <CardHeader>
                <Flex gap='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name={post.user.name} src={post.user.avatar} flexShrink={1} />
                        <Box>
                            <Heading size='sm'>{post.user.name}</Heading>
                            <Text color='gray.500'>{post.user.location}</Text>
                        </Box>
                    </Flex>
                    <IconButton
                        variant='ghost'
                        colorScheme='gray'
                        aria-label='See menu'
                        icon={<FiMoreHorizontal />}
                    />
                </Flex>
            </CardHeader>
            <CardBody>
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
                <Button flex='1' variant='ghost' leftIcon={<FiThumbsUp />}>
                    {post.interactions.likes}
                </Button>
                <Button flex='1' variant='ghost' leftIcon={<FiFeather />}>
                    {post.interactions.comments}
                </Button>
                <Button flex='1' variant='ghost' leftIcon={<FiShare />}>
                </Button>
            </CardFooter>
        </Card>
    )
}