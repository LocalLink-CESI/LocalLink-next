import {Box} from "@chakra-ui/react";
import RegisterForm from "@components/RegisterForm";

export default function SignUpPage() {
    return (
        <Box p={10} w="100%" h="100%" display="flex" justifyContent="center" alignItems="center">
            <RegisterForm/>
        </Box>
    )
}