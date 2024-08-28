import { Image } from "@chakra-ui/next-js";
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
    Tooltip,
    useDisclosure,
    useMediaQuery
} from "@chakra-ui/react";
import { FiFeather, FiShare, FiThumbsUp } from "react-icons/fi";
import { shadow, shadowHover } from "../../../theme";
import Link from "next/link";
import { GetUserWithId } from "@/app/actions/users/get";
import { useEffect, useState } from "react";
import CommentModal from "@/app/component/commentModal";
import { useSession } from "next-auth/react";
import { Like } from "@/app/actions/likes/create";
import { PostType } from ".prisma/client";
import { useRouter } from "next/navigation";
import { Post } from ".prisma/client";

export default function PostCard({ post }) {
    const router = useRouter()
    const url = window.location.hostname
    const { onOpen, onClose, isOpen } = useDisclosure();
    const [postUser, setPostUser] = useState(post.user)
    const [likes, setLikes] = useState(post.likes.map((like) => like.userId))
    const [likeCount, setLikeCount] = useState(post.likes.length)
    const [comments, setComments] = useState(post.comments)
    const [commentCount, setCommentCount] = useState(post.comments.length)

    let session = useSession();
    let userId = (session.data?.user as { id?: string })?.id;


    useEffect(() => {
        const postUserFetch = GetUserWithId(post.userId)
        postUserFetch.then((data) => {
            setPostUser(data)
        }).catch((e) => {
            console.error(e)
            // router.push('/404')
        })
    }, [setPostUser])

    const handleLike = async (postId: number, userId: string) => {
        try {
            await Like(userId, postId)
            if (!likes.includes(userId)) {
                let buff = likes
                buff = [...buff, userId]
                setLikes(buff)
                setLikeCount(likeCount + 1)
            } else {
                let buff = likes
                buff = buff.filter((id) => id !== userId)
                setLikes(buff)
                setLikeCount(likeCount - 1)
            }
        } catch (e) {
            console.error(e)
        }
    }

    const [isLargerThan1200] = useMediaQuery("(min-width: 1200px)");

    return (
        <Card w={isLargerThan1200 ? "auto" : "75%"} borderRadius={"20px"} boxShadow={shadow} cursor={"pointer"}
            transition={"box-shadow 0.2s ease-in-out"} _hover={{ boxShadow: shadowHover }}>
            <Link href={"/posts/" + post.id}>
                <CardHeader>
                    <Flex gap='0'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar size={isLargerThan1200 ? "md" : "sm"}
                                name={postUser.firstName + " " + postUser.lastName} src={postUser.image}
                                flexShrink={1} />
                            <Box>
                                <Heading
                                    size={isLargerThan1200 ? "sm" : "xs"}>{postUser.firstName + " " + postUser.lastName}</Heading>
                                <Text fontSize={isLargerThan1200 ? "sm" : "xs"}
                                    color='gray.500'>{postUser.city.name}</Text>
                            </Box>
                        </Flex>
                    </Flex>
                </CardHeader>
                <CardBody style={{ paddingTop: 0 }}>
                    <Text fontSize={isLargerThan1200 ? 18 : 16} fontWeight={600}>
                        {post.title}
                    </Text>
                    <Text fontSize={isLargerThan1200 ? 16 : 14}>
                        {post.text}
                    </Text>
                    {post.postType === PostType.EVENT && (
                        <>
                            <Text fontSize={14}
                                color='gray.500'>Début: {post.startAt.toLocaleDateString("fr")}</Text>
                            <Text fontSize={14}
                                color='gray.500'>Fin: {post.endAt.toLocaleDateString("fr")}</Text>
                            {post.localisation && <Text fontSize={14} color='gray.500'>Lieu: {post.localisation}</Text>}
                        </>
                    )}

                    {post.postType === PostType.SALE && (
                        <>
                            <Text fontSize={14}
                                color='gray.500'>Prix: {post.isDonation ? "Gratuit !" : post.price + "€"}</Text>
                        </>
                    )}
                </CardBody>
                {post.media ? (<Box aspectRatio={"16/9"} mx={0} position={"relative"}>
                    <Image
                        fill={true}
                        src={'/media/' + post.media}
                        alt='Exemple image for now'
                    />
                </Box>) : null}
            </Link>


            <CardFooter
                justify='center'
                flexWrap='wrap'
                sx={{
                    '& > button': {
                        minW: isLargerThan1200 ? '136px' : "50px",
                    },
                }}
                gap={4}
            >
                <Tooltip label="J'aime" aria-label="J'aime" placement="bottom">
                    <Button variant='brandGhostButton' leftIcon={<FiThumbsUp />} onClick={(e) => {
                        handleLike(post.id, userId)
                    }}>
                        {/* {post.interactions.likes} */} {likeCount}
                    </Button></Tooltip>
                <Tooltip label="Commenter" aria-label="Commenter" placement="bottom">
                    <Button variant='brandGhostButton' leftIcon={<FiFeather />} onClick={onOpen}>
                        {/* {post.interactions.comments} */} {comments.length}
                    </Button></Tooltip>
                <Tooltip label="Partager" aria-label="Partager" placement="bottom">
                    <Button variant='brandGhostButton' leftIcon={<FiShare />} onClick={
                        () => {
                            navigator.share({
                                title: post.title,
                                text: post.text,
                                url: "https://locallink.site/posts/" + post.id
                            })
                        }
                    }>
                    </Button></Tooltip>
            </CardFooter>
            <CommentModal isOpen={isOpen} onClose={onClose} post={post} userId={userId} />
        </Card>
    )
}