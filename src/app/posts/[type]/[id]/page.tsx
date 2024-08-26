'use client'
import {GetUserWithId} from "@/app/actions/users/get";
import PostCard from "@components/Home/PostCard"
import {Flex, useMediaQuery} from "@chakra-ui/react";
import {useEffect, useState} from "react"
import CommentCard from "@components/Home/CommentCard";
import ProfileLoading from "@/app/profile/loading";
import {GetPostById} from "@/app/actions/posts/get";

export default function Page({params}: { params: { type: string, id: number } }) {
    const [post, setPost] = useState(null)

    const [isLargerThan1200] = useMediaQuery("(min-width: 1200px)");
    const [isLargerThan700] = useMediaQuery("(min-width: 700px)");

    useEffect(() => {
        let post = GetPostById(params.id)
        post.then((data) => {
            const postUser = GetUserWithId((data as any).userId)
            postUser.then((user) => {
                setPost({...data, user})
            })
        }).catch((e) => {
            console.error(e)
        })
    }, [params.id, params.type, setPost])

    if (!post) return <ProfileLoading/>

    return (
        <main>
            <Flex justify="center" h="100%" mx={isLargerThan1200 ? "125" : "0"} w={isLargerThan700 ? "auto" : "100%"}
                  mt={"1rem"} overflow={"hidden"} py={"1rem"}>

                <Flex w={isLargerThan700 ? "60%" : "100%"} direction="column" alignItems={"center"} gap={"3rem"}
                      height={"100%"}>
                    <PostCard post={post}/>
                    {post.comments.map((comment, index) => {
                        return (
                            <CommentCard key={index} comment={comment}/>
                        )
                    })}
                </Flex>
            </Flex>
        </main>
    )
}