'use client'
import {GetPostWithId, GetPostWithIdAndType} from "@/app/actions/posts/get"
import { GetUserWithId } from "@/app/actions/users/get";
import PostCard from "@components/Home/PostCard"
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Container, Flex, Heading, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { use, useEffect, useState } from "react"
import { shadow } from "../../../../../theme";
import Image from "next/image";
import { FiFeather, FiShare, FiThumbsUp } from "react-icons/fi";

export default function Page({ params }: { params: { type:string ,id: string } }) {
    const [post, setPost] = useState(null)
    const { data: session, status } = useSession()
    const user = (session as any)?.session?.user
    const router = useRouter()
    useEffect(() => {
        // Get post from the server actions
        let post = GetPostWithIdAndType(parseInt(params.id), params.type )
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
    if (!post) return <div>Loading...</div>
    return (
        <main>
            <PostCard post={post} />
        </main>
    )
}