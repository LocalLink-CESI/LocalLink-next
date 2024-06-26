'use client'

import PostCard from "@/components/Home/PostCard";
import Calendar from '../components/Calendar/Calendar';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import GetPostsWithPaginationAndType, {GetPostsWithPaginationFeed} from "./actions/posts/get";
import { PostType } from "@/helpers/database";
import { Flex, Grid, useMediaQuery, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, IconButton } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
export default function Home() {
    const [activeDate, setActiveDate] = useState<Date>(new Date());
    const [posts, setPosts] = useState([]);

    const session = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/auth/signin')
        },
    });

    const user = (session as any)?.session?.user

    const onClickDate = (day: number, month: number) => {
        if (typeof day !== 'string' && day != -1) {
            let newDate = new Date(activeDate.setMonth(month));
            newDate = new Date(activeDate.setDate(day));
            setActiveDate(newDate);
        }
    };

    useEffect(() => {
        const posts = GetPostsWithPaginationAndType({ limit: 10, offset: 0 }, PostType.DEFAULT, user?.cityId)
        posts.then((data) => {
            setPosts(data)
        })
    }, [setPosts]
    )

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

    return (
        <main>
            <Flex justify="center" h="100%" mx={isLargerThan800 ? "125" : "1"} mt={"1rem"} py={"1rem"} direction={isLargerThan800 ? "row" : "column"}>

                <Flex w={isLargerThan800 ? "70%" : "100%"} direction="column" alignItems={"center"} gap={"3rem"} height={"100%"}>
                    {posts.map((post, index) => (
                        <PostCard key={index} post={post} />
                    ))}
                </Flex>

                {isLargerThan800 ? (
                    <Grid w={"30%"} column={""} gap={6}>
                        <Grid column={""} gap={6}>
                            <Flex
                                direction="column"
                                align="center"
                                w={"100%"}
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

                    </Grid>
                ) : (
                    <>
                        <IconButton
                            aria-label="Open Menu"
                            size="lg"
                            mr={2}
                            icon={<FiMenu />}
                            onClick={onOpen}
                        />
                        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                            <DrawerOverlay>
                                <DrawerContent>
                                    <DrawerCloseButton />
                                    <Grid column={""} gap={6}>
                                        <Grid column={""} gap={6}>
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

                                    </Grid>
                                </DrawerContent>
                            </DrawerOverlay>
                        </Drawer>
                    </>
                )}

            </Flex>
        </main>
    );
}
