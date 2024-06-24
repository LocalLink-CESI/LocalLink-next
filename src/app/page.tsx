'use client'

import PostCard from "@/components/Home/PostCard";
import { useUserStore } from "@/providers/user-store-provider";
import { Flex, Grid, Text } from "@chakra-ui/react";
import Calendar from '../components/Calendar/Calendar';
import { useState } from "react";
// import "@/assets/scss/home.scss"

const posts = [
    {
        user: {
            name: "Segun Adebayo",
            avatar: "https://bit.ly/sage-adebayo",
            location: "Abuja, Nigeria"
        },
        content: "Hello again everyone! I just wanted to share this beautiful painting I painted today. I hope you all have a great day!",
        image: "/example2.webp",
        interactions: {
            likes: 158,
            comments: 20
        }
    },
    {
        user: {
            name: "Segun Adebayo",
            avatar: "https://bit.ly/sage-adebayo",
            location: "Abuja, Nigeria"
        },
        content: "Hi my fellow neighbors! I just joined this app and am quite unsure as to what the next steps might be for me here. I would appreciate any help or guidance you can offer me. Below is a picture of trying trying to piece out how to use this thing. Thanks! 🙏",
        image: "/example1.png",
        interactions: {
            likes: 10,
            comments: 4
        }
    },

]

export default function Home() {
    const user = useUserStore((state) => state)
    const [activeDate, setActiveDate] = useState<Date>(new Date());

    const onClickDate = (day: number, month: number) => {

        if (typeof day !== 'string' && day != -1) {
            let newDate = new Date(activeDate.setMonth(month));
            newDate = new Date(activeDate.setDate(day));
            setActiveDate(newDate);
        }
        console.log(activeDate);
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
                        justify="center"
                        // bg="brand.900"
                        minW="200px"
                        minH="200px"
                        borderRadius="md"
                        border={"1px solid #E2E8F0"}
                    >
                        <h2>EVENEMENTS</h2>
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
