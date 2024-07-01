import {RegisterForm} from "@/app/auth/signup/Form";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";
import {redirect} from "next/navigation";

type Props = {
    searchParams: Record<"callbackUrl" | "error", string>;
}

const SignUpPage = async (props: Props) => {
    const session = await getServerSession(authOptions);

    console.log(session);

    if (session) {
        redirect(props.searchParams.callbackUrl || "/");
    }

    return (
        <RegisterForm />
    )
}

export default SignUpPage;