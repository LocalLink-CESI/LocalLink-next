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
import {shadow, shadowHover} from "../../../theme";
import Link from "next/link";
import {Image} from "@chakra-ui/next-js";
import {FiFeather, FiShare, FiThumbsUp} from "react-icons/fi";
import CommentModal from "@/app/component/commentModal";

export default function CommentCard({comment}: { comment: any }) {
    const {user, text} = comment
    console.log(user, text)
    return (
        <Card w={"100%"} borderRadius={"20px"} boxShadow={shadow} cursor={"pointer"}
              transition={"box-shadow 0.2s ease-in-out"} _hover={{boxShadow: shadowHover}}>
                <CardHeader>
                    <Flex gap='0'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar name={user.firstName + " " + user.lastName} src={user.image}
                                    flexShrink={1}/>
                            <Box>
                                <Heading size='sm'>{user.firstName + " " + user.lastName}</Heading>
                                <Text fontSize="sm" color='gray.500'>{user.city.name}</Text>
                            </Box>
                        </Flex>
                    </Flex>
                </CardHeader>
                <CardBody style={{paddingTop: 0}}>
                    <Text>
                        {text}
                    </Text>
                </CardBody>
        </Card>
    )
}