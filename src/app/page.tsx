'use client'

import PostCard from "@/components/Home/PostCard";
import { Flex, Grid } from "@chakra-ui/react";
import Calendar from '../components/Calendar/Calendar';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import GetPostsWithPaginationAndType from "./actions/posts/get";
import { PostType } from "@/helpers/database";

export default function Home() {
    const [activeDate, setActiveDate] = useState<Date>(new Date());
    const [posts, setPosts] = useState([]);
    useSession({
        required: true,
        onUnauthenticated() {
            redirect('/auth/signin')
        },
    });

    const { data: session, status } = useSession()

    const user = (session as any)?.session?.user
    const onClickDate = (day: number, month: number) => {
        if (typeof day !== 'string' && day != -1) {
            let newDate = new Date(activeDate.setMonth(month));
            newDate = new Date(activeDate.setDate(day));
            setActiveDate(newDate);
        }
    };

    useEffect(() => {
        // Get posts from the city from the server actions
        const posts = GetPostsWithPaginationAndType({ limit: 10, offset: 0 }, PostType.DEFAULT, user?.cityId)
        posts.then((data) => {
            setPosts(data)
        })
    }, [setPosts])

    return (
        <main>
            <Flex justify="center" h="100%" mx="125" mt={"1rem"} overflow={"hidden"} py={"1rem"}>

                <Flex w={"60%"} direction="column" alignItems={"center"} gap={"3rem"} height={"100%"}>
                    {posts.map((post, index) => (
                        <PostCard key={index} post={post} />
                    ))}
                </Flex>

                <Grid w={"40%"} column={""} gap={6}>
                    <Flex
                        direction="column"
                        align="center"
                        minW="200px"
                        minH="200px"
                        borderRadius="md"
                    >
                        <h2 style={{
                            marginBottom: 30,
                            fontSize: 25,
                            fontWeight: 800,
                            fontFamily: "Montserrat"
                        }}>EVENEMENTS</h2>
                        <Calendar activeDate={activeDate} onClick={onClickDate} />
                    </Flex>
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        bg="brand.900"
                        minW="200px"
                        minH="200px"
                        borderRadius="md"
                    >
                        <h2>NEWS</h2>
                        <p>Dernières nouvelles</p>
                    </Flex>
                </Grid>


            </Flex>
        </main>
    );
}
