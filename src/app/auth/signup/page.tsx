import RegisterForm, { SignUp } from "@components/RegisterForm";

type Props = {
    searchParams: Record<"callbackUrl" | "error", string>;
}

const SignUpPage = (props: Props) => {
    return (<>
        <SignUp />
        <RegisterForm error={props.searchParams.error} callbackUrl={props.searchParams.callbackUrl} />
    </>
    )
}

export default SignUpPage;