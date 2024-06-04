import {Box, Image, Text} from "@chakra-ui/react";

export default function Register() {
    return (
        <Box p={10} w="100%" h="100%" display="flex" justifyContent="center" alignItems="center">
            <Box dir={"column"} w={{md: '50%'}} p={10}>
                <Box>
                    <Text>Register</Text>
                    <Text>Create an account</Text>
                    <Text>Already have an account? <a href={"/login"}>Login</a></Text>
                </Box>

                <Box>
                    <form>
                        <input type="text" placeholder="Username"/>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>
                        <button type="submit">Register</button>
                    </form>
                </Box>
            </Box>
            <Image src="https://media.giphy.com/media/3htQ6tCfZ3qfv4sXk6/giphy.gif" alt="register" h={'100%'} w={{md: '50%'}} borderRadius={10}/>
        </Box>
    )
}