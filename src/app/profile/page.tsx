'use client'
import {Avatar, Flex, Heading, Stack, Text,} from '@chakra-ui/react';
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import PostModal from "@/app/component/postModal";
import {Key, useEffect, useState} from "react";
import {GetPostsWithUserIdWithPagination} from "@/app/actions/posts/get";
import PostCard from "@components/Home/PostCard";
import ProfileLoading from "@/app/profile/loading";

// So that page would have the users profile information with an "edit" somewhere, maybe a place to pin some posts, and a place to see the posts they've made.
export default function Profile() {
    const session = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/auth/signin')
        },
    });

    const user = (session.data as any)?.session?.user;
    const userId = user?.id;

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const posts = GetPostsWithUserIdWithPagination({limit: 10, offset: 0}, userId)
        posts.then((data) => {
            setPosts(data)
        })

    }, [setPosts, userId])

    // const [likes, setLikes] = useState([]);
    //
    // useEffect(() => {
    //     const likes = GetLikesByUserId(userId)
    //     likes.then((data) => {
    //         setLikes(data)
    //     })
    // }, [setLikes, userId])

    if (session.status === 'loading') return ProfileLoading();

    if (!user) return null;

    return (
        <Flex direction={"column"} py={6} margin={"auto"} alignItems={"center"}>
            <Stack
                borderWidth="1px"
                borderRadius="lg"
                w={{sm: '100%', md: '800px'}}
                direction={{base: 'column', md: 'row'}}
                boxShadow={'xl'}
                padding={4}>
                <Flex flex={1}>
                    <Avatar name={user.firstName + " " + user.lastName} src={user.image}
                            aspectRatio={"1/1"}
                            borderRadius={"lg"}
                            borderWidth={2}
                            objectFit="cover"
                            boxSize="100%"
                    />
                </Flex>
                <Stack
                    flex={2}
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    gap={"1rem"}
                    p={1}
                    pt={2}>
                    <Heading fontSize={'2xl'} fontFamily={'body'} color={"black"}>
                        {user.firstName} {user.lastName}
                    </Heading>
                    <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
                        {/*{user.location}*/}
                    </Text>
                    <Text
                        textAlign={'center'}
                        color={"gray.400"}
                        px={3}>
                        {user.bio}
                    </Text>

                </Stack>
            </Stack>

            <Stack
                borderRadius="lg"
                direction={{base: 'column', md: 'row'}}
                mt={"4rem"}
                padding={4}>
                <Stack
                    flex={2}
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    gap={"1rem"}
                    p={1}
                    pt={2}>
                    <Heading fontSize={'2xl'} fontFamily={'body'} color={"black"}>
                        Mes posts
                    </Heading>

                    <Stack
                        mt={'2rem'}
                        direction={'row'}
                        padding={2}
                        justifyContent={'space-between'}
                        alignItems={'center'}>

                        {/*<UpdateUserModal/>*/}

                        <PostModal/>
                    </Stack>

                    <Stack
                        width={'100%'}
                        direction={'column'}
                        padding={2}
                        gap={"3rem"}
                        justifyContent={'space-between'}
                        alignItems={'center'}>
                        <Text
                            hidden={posts.length > 0}
                            fontSize={'lg'}
                            fontFamily={'body'}
                            color={"black"}>
                            Aucun post pour le moment
                        </Text>

                        {posts.map((post: any, index: Key) => {
                            return (
                                <PostCard key={index} post={post}/>
                            )
                        })}

                    </Stack>

                </Stack>
            </Stack>

            {/*{likes && likes.length > 0 && (*/}
            {/*    <Stack*/}
            {/*        borderRadius="lg"*/}
            {/*        direction={{base: 'column', md: 'row'}}*/}
            {/*        mt={"4rem"}*/}
            {/*        padding={4}>*/}
            {/*        <Stack*/}
            {/*            flex={2}*/}
            {/*            flexDirection="column"*/}
            {/*            justifyContent="center"*/}
            {/*            alignItems="center"*/}
            {/*            gap={"1rem"}*/}
            {/*            p={1}*/}
            {/*            pt={2}>*/}
            {/*            <Heading fontSize={'2xl'} fontFamily={'body'} color={"black"}>*/}
            {/*                Mes likes*/}
            {/*            </Heading>*/}

            {/*            <Stack*/}
            {/*                width={'100%'}*/}
            {/*                direction={'column'}*/}
            {/*                padding={2}*/}
            {/*                gap={"3rem"}*/}
            {/*                justifyContent={'space-between'}*/}
            {/*                alignItems={'center'}>*/}
            {/*                <Text*/}
            {/*                    hidden={posts.length > 0}*/}
            {/*                    fontSize={'lg'}*/}
            {/*                    fontFamily={'body'}*/}
            {/*                    color={"black"}>*/}
            {/*                    Aucun post pour le moment*/}
            {/*                </Text>*/}

            {/*                {likes.map((post: any, index: Key) => {*/}
            {/*                    return (*/}
            {/*                        <PostCard key={index} post={post}/>*/}
            {/*                    )*/}
            {/*                })}*/}

            {/*            </Stack>*/}

            {/*        </Stack>*/}
            {/*    </Stack>*/}
            {/*)}*/}
        </Flex>
    )
}
