'use client'

import PostCard from "@/components/Home/PostCard";
import { useUserStore } from "@/providers/user-store-provider";
import { Flex, Grid, Text } from "@chakra-ui/react";
import Calendar from '../components/Calendar/Calendar';
import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
// import "@/assets/scss/home.scss"

export default function Home() {
    const user = useUserStore((state) => state)
    const [activeDate, setActiveDate] = useState<Date>(new Date());
    const { data: session } = useSession();
    console.log(session)
    if (!session) {
        // redirect to /auth/signin:
        redirect("/auth/signin")
    }
    const onClickDate = (day: number, month: number) => {

        if (typeof day !== 'string' && day != -1) {
            let newDate = new Date(activeDate.setMonth(month));
            newDate = new Date(activeDate.setDate(day));
            setActiveDate(newDate);
        }
    };

    return (
        <main>
            <Flex justify="center" h="100%" mx="125" mt={"1rem"} overflow={"hidden"} py={"1rem"}>

                <Flex w={"60%"} direction="column" alignItems={"center"} gap={"3rem"} height={"100%"} >
                    {/* <Text
            fontFamily="Montserrat"
            fontSize="3xl"
            fontWeight="bold"
            textAlign="center"
            color="black"
            mb={8}
          >POSTS</Text> */}
                    {user.posts.map((post, index) => (
                        <PostCard key={index} post={post} />
                    ))}
                </Flex>

                <Grid w={"40%"} column={""} gap={6}>
                    <Flex
                        direction="column"
                        align="center"
                        // justify="center"
                        // bg="brand.900"
                        minW="200px"
                        minH="200px"
                        borderRadius="md"
                    >
                        <h2 style={{ marginBottom: 30, fontSize: 25, fontWeight: 800, fontFamily: "Montserrat" }}>EVENEMENTS</h2>
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
