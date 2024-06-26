'use client';

import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {Box, Button, Select, Stack, Text, Toast, useToast} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {GetAllPosts} from "@/app/actions/posts/get";
import {GetAllUsers} from "@/app/actions/users/get";
import DeletePost from "@/app/actions/posts/delete";
import GetCities from "@/app/actions/cities/get";
import UpdateUserModal from "@/app/component/updateUserModal";
import User from "@/models/User";
import ProfileLoading from "@/app/profile/loading";
import {DeleteUserWithId} from "@/app/actions/users/delete";

export default function Admin() {

    const router = useRouter();

    let toast = useToast();

    const [posts, setPosts] = useState([]);

    const [filteredPosts, setFilteredPosts] = useState([])

    useEffect(() => {
        const posts = GetAllPosts()
        posts.then((data) => {
            console.log(data)
            setPosts(data)
            setFilteredPosts(data)
        })

    }, [setPosts])


    const [users, setUsers] = useState([]);

    const [filteredUsers, setFilteredUsers] = useState([])

    useEffect(() => {
        const users = GetAllUsers()
        users.then((data) => {
            setUsers(data)
            setFilteredUsers(data)
        })

    }, [setUsers])

    const HandleAllFilter = (cityId: number) => {
        setFilteredPosts(posts.filter((post: any) => post.cityId === cityId))
        setFilteredUsers(users.filter((user: any) => user.cityId === cityId))
    }

    const [cities, setCities] = useState<{ id: number; name: string; }[]>([]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const fetchedCities = await GetCities();
                const convertedCities = fetchedCities.map(city => ({
                    id: Number(city.id),
                    name: city.name,
                }));
                setCities(convertedCities);
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };

        fetchCities();
    }, []);



    const session = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/auth/signin");
        }
    })

    if (session.status === 'loading') return ProfileLoading();

    const user = (session.data as any)?.session?.user as any;

    if (user.role !== "ADMIN") {
        router.push("/");
    }


    return (
        <div>
            <h1>Admin Page</h1>

            <Box>
                <Select placeholder="Select City" onChange={(e) => HandleAllFilter(Number(e.target.value))}>
                    {cities && cities.map((city) => {
                        return (
                            <option key={city.id} value={city.id}>{city.name}</option>
                        )
                    })}
                </Select>

                <Button onClick={() => {
                    setFilteredPosts(posts)
                    setFilteredUsers(users)
                }}>Clear Filter</Button>

                <Stack direction="row" justify="space-evenly">
                    <Box>
                        <Text>Manage Posts</Text>

                        <Stack>
                            {filteredPosts && filteredPosts.map((post: any) => {
                                return (
                                    <Box key={post.id}>
                                        <Text>{post.title}</Text>

                                        <Button onClick={async () => {
                                            await DeletePost(post.id, post.type)

                                            toast({
                                                title: "Post supprimé.",
                                                description: "Le post a été supprimé avec succès.",
                                                status: "success",
                                                duration: 9000,
                                                isClosable: true,
                                            })

                                            setTimeout(() => {
                                                window.location.reload();
                                            }, 1000);
                                        }}>Delete</Button>
                                    </Box>
                                )
                            })}
                        </Stack>

                    </Box>

                    <Box>
                        <Text>Manage Users</Text>

                        <Stack>
                            {filteredUsers && filteredUsers.map((user: User) => {
                                return (
                                    <Box key={user.id}>
                                        <Text>{user.firstName} {user.lastName}</Text>

                                        <UpdateUserModal user={user}/>

                                        <Button onClick={async () => {
                                            await DeleteUserWithId(user.id)

                                            toast({
                                                title: "Utilisateur supprimé.",
                                                description: "L'utilisateur a été supprimé avec succès.",
                                                status: "success",
                                                duration: 9000,
                                                isClosable: true,
                                            })

                                            setTimeout(() => {
                                                window.location.reload();
                                            }, 1000);
                                        }}>Supprimer</Button>
                                    </Box>
                                )
                            })}
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </div>
    );
}