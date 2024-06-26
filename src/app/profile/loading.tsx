import {AbsoluteCenter, Box, Spinner} from "@chakra-ui/react";

export default function ProfileLoading() {
    return (
        // <Flex direction="column" align="center" justify="center" h="100vh" bg="brand.900" color="white">
        //     <Box w="100%" h="30vh" bg="brand.800" position="relative">
        //         <Skeleton h="100%" w="100%" />
        //     </Box>
        <Box w="100%" p="1rem">
            <AbsoluteCenter>
                {/*<Skeleton h="2rem" w="50%" mb="1rem" />*/}
                {/*<Skeleton h="1rem" w="25%" mb="1rem" />*/}
                {/*<Skeleton h="1rem" w="75%" />*/}
                <Spinner size="xl"/>
            </AbsoluteCenter>
        </Box>
        // </Flex>
    )
}