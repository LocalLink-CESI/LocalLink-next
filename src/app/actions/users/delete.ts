'use server';
import {getServerSession} from "next-auth";

import {prisma} from "@/helpers/database";
import {authOptions} from "@/lib/authOptions";

export async function DeleteUserWithId(id: string) {
    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    });

    if (user.id === id || user.role === "ADMIN") {
        return prisma.user.update({
            where: {
                id: id
            },
            data: {
                isDeleted: true
            }
        }).catch((error: Error) => {
            return error;
        });
    }

    return new Error("Unauthorized");
}