'use client'
import { Avatar, Flex, Heading, Stack, Text, useMediaQuery, } from '@chakra-ui/react';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import PostModal from "@/app/component/postModal";

import { Key, useEffect, useState } from "react";
import { GetPostsWithUserId } from "@/app/actions/posts/get";
import PostCard from "@components/Home/PostCard";
import { GetLikesByUserId } from "@/app/actions/likes/get";
import { GetUserWithId } from "@/app/actions/users/get";
import ProfileLoading from "@/app/profile/loading";

// So that page would have the users profile information with an "edit" somewhere, maybe a place to pin some posts, and a place to see the posts they've made.
export default function Profile() {
    interface User {
        firstName: string;
        lastName: string;
        image: string;
        bio: string;
    }

    const [user, setUser] = useState<User>({
        firstName: '',
        lastName: '',
        image: '',
        bio: '',
    });

    const session = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/auth/signin')
        },
    });

    let userId = null;
    if (session.status === "authenticated" && (session as any).data.session) {
        userId = (session as any).data.session?.user.id;
    }

    const [posts, setPosts] = useState([]);
    const [likes, setLikes] = useState<any[] | void>([]);
    const [isLargerThan1200] = useMediaQuery("(min-width: 1200px)");
    const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
    const [isLargerThan400] = useMediaQuery("(min-width: 400px)");

    useEffect(() => {
        if (!userId) return;
        const post = GetPostsWithUserId({ limit: 10, offset: 0 }, userId)
        post.then((data) => {
            setPosts(data)
        })

        const userData = GetUserWithId(userId)
        userData.then((data) => {
            setUser(data as User)
        });
    }, [setPosts, userId])

    // const [likes, setLikes] = useState([]);
    //
    // useEffect(() => {
    //     const likes = GetLikesByUserId(userId)
    //     likes.then((data) => {
    //         setLikes(data)
    //     })
    // }, [setLikes, userId])


    useEffect(() => {
        const likes = GetLikesByUserId(userId)
        likes.then((data) => {
            setLikes(data)
        })
    }, [setLikes, userId])

    if (!user) return null;
    if (session.status === 'loading') return ProfileLoading();


    return (
        <Flex direction={"column"} py={6} margin={"auto"} mx={isLargerThan400 ? 0 : -6} alignItems={"center"}>
            <Stack
                direction={"row"}
                borderWidth="1px"
                borderRadius="lg"
                w={isLargerThan1200 ? "800px" : isLargerThan600 ? "500px" : "80%"}
                boxShadow={'xl'}
                padding={4}>
                <Flex flex={1} direction={"row"}>
                    <Avatar name={user.firstName + " " + user.lastName} src={user.image}
                        aspectRatio={1}
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
                w={isLargerThan1200 ? "auto" : "100%"}
                borderRadius="lg"
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

                        <PostModal />
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

                        {posts.map((post, index: Key) => {
                            return (
                                <PostCard key={index} post={post} />
                            )
                        })}

                    </Stack>

                </Stack>
            </Stack>

            {likes && likes.length > 0 && (
                <Stack
                    borderRadius="lg"
                    direction={{ base: 'column', md: 'row' }}
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
                            Mes likes
                        </Heading>
                        {likes.map((post: any, index: Key) => {
                            return (
                                <PostCard key={index} post={post} />
                            )
                        })}
                    </Stack>
                </Stack>
            )}
        </Flex>
    )
}
