import { Avatar, Box, Flex, Heading, Text, Image } from "@chakra-ui/react"
// So that page would have the users profile information with an "edit" somewhere, maybe a place to pin some posts, and a place to see the posts they've made.
export default function Profile() {
    const testProfile = {
        name: "John Doe",
        location: "Paris",
        avatar: "https://bit.ly/dan-abramov",
        cover: "https://bit.ly/2Z4KKcF",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    }
    return (
        <Flex direction="column" align="center" justify="center" h="100vh" bg="brand.900" color="white">
            <Box w="100%" h="30vh" bg="brand.800" position="relative">
                <Image
                    src={testProfile.cover}
                    alt="Cover image"
                    objectFit="cover"
                    w="100%"
                    h="100%"
                />
                <Avatar
                    src={testProfile.avatar}
                    size="xl"
                    position="absolute"
                    bottom="-20%"
                    left="50%"
                    transform="translateX(-50%)"
                />
            </Box>
            <Box w="100%" p="1rem">
                <Heading size="lg">{testProfile.name}</Heading>
                <Text>{testProfile.location}</Text>
                <Text>{testProfile.bio}</Text>
            </Box>
        </Flex>
    )

}