'use server';
import { getServerSession } from "next-auth";

import { prisma } from "@/helpers/database";
import { authOptions } from "@/lib/authOptions";

export default async function DeleteMe() {
    let user = await getServerSession(authOptions)
    if (!user || !user.user || !user.user.name) return null;

    return prisma.user.update({
        where: {
            email: user.user.email
        },
        data: {
            isDeleted: true
        }
    }).catch((error : Error) => {
        return error;
    });
}

export async function DeleteUserWithId(id: string) {
    const user = getServerSession(authOptions);

    // if user is admin
    

    return prisma.user.delete(
        {
            where: {
                id: id
            }
        }
    ).catch((error : Error) => {
        return error;
    });
}