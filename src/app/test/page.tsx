import {authOptions} from "@/lib/authOptions";
import {getServerSession} from "next-auth";

const SessionTest = async () => {
    const session = await getServerSession(authOptions);

    return (
        <div>
            <h1>Session Test</h1>

            <p>Session Test</p>

            {/*{session && (*/}
            {/*    <p>{session}</p>*/}
            {/*)}*/}
        </div>
    )
}

export default SessionTest;