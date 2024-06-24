'use client'
import PostCard from '@/components/Home/PostCard';
import { useUserStore } from '@/providers/user-store-provider';
import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
} from '@chakra-ui/react';

// So that page would have the users profile information with an "edit" somewhere, maybe a place to pin some posts, and a place to see the posts they've made.
export default function Profile() {
    const user = useUserStore((state) => state)
    return (
        <Flex direction={"column"} py={6} margin={"auto"} alignItems={"center"}>
            <Stack
                borderWidth="1px"
                borderRadius="lg"
                w={{ sm: '100%', md: '800px' }}
                direction={{ base: 'column', md: 'row' }}
                boxShadow={'xl'}
                padding={4}>
                <Flex flex={1}>
                    <Image
                        objectFit="cover"
                        boxSize="100%"
                        src={user.avatar}
                        aspectRatio={"1/1"}
                        borderRadius={"lg"}
                        alt={"Photo de profil"}
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
                        {user.name}
                    </Heading>
                    <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
                        {user.location}
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
                        Mes posts
                    </Heading>

                    <Stack
                        // width={'100%'}
                        mt={'2rem'}
                        direction={'row'}
                        padding={2}
                        justifyContent={'space-between'}
                        alignItems={'center'}>
                        <Button
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                            color={'black'}
                            variant={"brandPrimaryButton"}
                            px={10}
                            boxShadow={
                                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                            }>
                            Créer un post
                        </Button>
                    </Stack>

                    <Stack
                        width={'100%'}
                        direction={'column'}
                        padding={2}
                        gap={"3rem"}
                        justifyContent={'space-between'}
                        alignItems={'center'}>
                        <Text
                            hidden={user.posts.length > 0}
                            fontSize={'lg'}
                            fontFamily={'body'}
                            color={"black"}>
                            Aucun post pour le moment
                        </Text>

                        {user.posts.map((post, index) => (
                            <PostCard key={index} post={post} />
                        ))}

                    </Stack>

                </Stack>
            </Stack>
        </Flex>
    )

}
