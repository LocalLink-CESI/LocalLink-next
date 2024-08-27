'use client'

import PostCard from "@/components/Home/PostCard";
import Calendar from '../components/Calendar/Calendar';
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Grid,
    IconButton,
    useDisclosure,
    useMediaQuery
} from "@chakra-ui/react";
import {FiMenu} from "react-icons/fi";
import ProfileLoading from "@/app/profile/loading";
import {GetCityPosts} from "@/app/actions/posts/get";

export default function Home() {
    const [activeDate, setActiveDate] = useState<Date>(new Date());
    const [posts, setPosts] = useState([]);

    const session = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/auth/signin')
        },
    });

    let user = null;
    if (session.data) user = session.data.user;

    const onClickDate = (day: number, month: number) => {
        if (typeof day !== 'string' && day != -1) {
            let newDate = new Date(activeDate.setMonth(month));
            newDate = new Date(activeDate.setDate(day));
            setActiveDate(newDate);
        }
    };


    useEffect(() => {
        if (!user) return;
        console.log(user)

        let posts= GetCityPosts(user?.cityId, 10, 1)

         posts.then((data) => {
             if (data instanceof Error) return console.error(data)
             setPosts(data)
        })
    }, [setPosts, user])

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");
    const [isLargerThan1600] = useMediaQuery("(min-width: 1600px)");
    const [isLargerThan1400] = useMediaQuery("(min-width: 1400px)");
    const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
    if (session.status === 'loading') return ProfileLoading();

    return (
        <main>
            <Flex justify="center" h="100%" mx={isLargerThan1400 ? "125" : isLargerThan1000 ? "50" : "1"} mt={"1rem"}
                  py={"1rem"} direction={isLargerThan800 ? "row" : "column"}>

                <Flex order={isLargerThan800 ? 0 : 3}
                      w={isLargerThan800 ? isLargerThan1000 ? "70%" : isLargerThan1600 ? "100%" : "60%" : "100%"}
                      direction="column" alignItems={"center"} gap={"3rem"} height={"100%"}>
                    {posts.map((post, index) => (
                        <PostCard key={index} post={post}/>
                    ))}
                </Flex>

                {isLargerThan1000 ? (
                    <Grid order={isLargerThan800 ? 3 : 0} w={isLargerThan1600 ? "30%" : "40%"} column={""} gap={6}>
                        <Grid column={""} gap={6} alignContent={"baseline"}>
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
                                <Calendar activeDate={activeDate} onClick={onClickDate}/>
                            </Flex>
                            <Flex
                                direction="column"
                                align="center"
                                justify="center"
                                // bg="brand.900"
                                minW="200px"
                                minH="200px"
                                borderRadius="md"
                            >
                                <h2 style={{
                                    marginBottom: 30,
                                    fontSize: 25,
                                    fontWeight: 800,
                                    fontFamily: "Montserrat"
                                }}>NEWS</h2>
                                <p>Dernières nouvelles</p>
                            </Flex>
                        </Grid>

                    </Grid>
                ) : (
                    <>
                        <Flex h={"fit-content"} alignItems={"center"} gap={6} direction={"column"} mb={8}>
                            <h2 style={{
                                // marginBottom: 30,
                                fontSize: 16,
                                fontWeight: 800,
                                fontFamily: "Montserrat"
                            }}>EVENEMENTS ET NEWS</h2>
                            <IconButton
                                aria-label="Open Menu"
                                size="lg"
                                mr={2}
                                icon={<FiMenu/>}
                                onClick={onOpen}
                            />
                        </Flex>
                        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                            <DrawerOverlay>
                                <DrawerContent>
                                    <DrawerCloseButton/>
                                    <Grid column={""} gap={6} mt={10} overflow={"scroll"}>
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
                                                <Calendar activeDate={activeDate} onClick={onClickDate}/>
                                            </Flex>
                                            <Flex
                                                direction="column"
                                                align="center"
                                                justify="center"
                                                minW="200px"
                                                minH="200px"
                                                borderRadius="md"
                                            >
                                                <h2 style={{
                                                    marginBottom: 30,
                                                    fontSize: 25,
                                                    fontWeight: 800,
                                                    fontFamily: "Montserrat"
                                                }}>NEWS</h2>
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
