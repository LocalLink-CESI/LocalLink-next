import {Image} from "@chakra-ui/next-js";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    Text,
    Tooltip
} from "@chakra-ui/react";
import {FiFeather, FiShare, FiThumbsUp} from "react-icons/fi";
import {shadow, shadowHover} from "../../../theme";
import Link from "next/link";

export default function PostCard({post}: { post: any }) {

    const user = post.user;

    return (
        <Link href={"/posts/" + post.id}>
            <Card maxW='xl' borderRadius={"20px"} boxShadow={shadow} cursor={"pointer"}
                  transition={"box-shadow 0.2s ease-in-out"} _hover={{boxShadow: shadowHover}}>
                <CardHeader>
                    <Flex gap='0'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar name={user.firstName + " " + user.lastName} src={user.image} flexShrink={1}/>
                            <Box>
                                <Heading size='sm'>{user.firstName + " " + user.lastName}</Heading>
                                <Text fontSize="sm" color='gray.500'>{user.city.name}</Text>
                            </Box>
                        </Flex>
                    </Flex>
                </CardHeader>
                <CardBody style={{paddingTop: 0}}>
                    <Text fontSize={18} fontWeight={600}>
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
                        <Button variant='brandGhostButton' leftIcon={<FiThumbsUp/>}>
                            {/* {post.interactions.likes} */} 0
                        </Button></Tooltip>
                    <Tooltip label="Commenter" aria-label="Commenter" placement="bottom">
                        <Button variant='brandGhostButton' leftIcon={<FiFeather/>}>
                            {/* {post.interactions.comments} */} 0
                        </Button></Tooltip>
                    <Tooltip label="Partager" aria-label="Partager" placement="bottom">
                        <Button variant='brandGhostButton' leftIcon={<FiShare/>}>
                        </Button></Tooltip>
                </CardFooter>
            </Card>
        </Link>
    )
}