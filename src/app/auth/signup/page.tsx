import RegisterForm, { SignUp } from "@components/RegisterForm";

type Props = {
    searchParams: Record<"callbackUrl" | "error", string>;
}

const SignUpPage = (props: Props) => {
    return (<>
        <SignUp />
    </>
    )
}

export default SignUpPage;