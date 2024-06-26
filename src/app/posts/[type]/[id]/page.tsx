'use client'
import { GetPostWithIdAndType } from "@/app/actions/posts/get"
import { GetUserWithId } from "@/app/actions/users/get";
import PostCard from "@components/Home/PostCard"
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import CommentCard from "@components/Home/CommentCard";
import ProfileLoading from "@/app/profile/loading";

export default function Page({ params }: { params: { type: string, id: string } }) {
    const [post, setPost] = useState(null)
    const { data: session, status } = useSession()
    const user = (session as any)?.session?.user
    const router = useRouter()
    const [isLargerThan1200] = useMediaQuery("(min-width: 1200px)");
    const [isLargerThan700] = useMediaQuery("(min-width: 700px)");
    useEffect(() => {
        // Get post from the server actions
        let post = GetPostWithIdAndType(parseInt(params.id), params.type)
        post.then((data) => {
            // @ts-ignore
            data.type = params.type
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
    }, [setPost])
    if (!post) return <ProfileLoading />
    return (
        <main>
            <Flex justify="center" h="100%" mx={isLargerThan1200 ? "125" : "0"} w={isLargerThan700 ? "auto" : "100%"} mt={"1rem"} overflow={"hidden"} py={"1rem"}>

                <Flex w={isLargerThan700 ? "60%" : "100%"} direction="column" alignItems={"center"} gap={"3rem"} height={"100%"}>
                    <PostCard post={post} />
                    {post.comments.map((comment, index) => {
                        return (
                            <CommentCard key={index} comment={comment} />
                        )
                    })}
                </Flex>
            </Flex>
        </main>
    )
}