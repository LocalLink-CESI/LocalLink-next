import bcrypt from "bcryptjs";
import {prisma} from "@/helpers/database";

export default async function LogUser(form: {
    email: string;
    password: string;
}) {
    const user = await prisma.user.findFirst({
        where: {
            email: form.email
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(form.password, user.password);

    if (!passwordMatch) {
        throw new Error("Invalid password");
    }

    return user;
}