'use server';
import { getServerSession } from "next-auth";

import { prisma } from "@/helpers/database";
import { authOptions } from "@/lib/authOptions";

export default async function DeleteMe(form: FormData) {
    let user = await getServerSession(authOptions)
    if (!user || !user.user || !user.user.name) return null;
    return prisma.user.delete({
        where: {
            id: user.user.name
        }
    }).catch((error) => {
        console.log(error);
    });
}

export async function DeleteUserWithId(id: string) {
    //TODO VERIFIER ROLE
    return prisma.user.delete(
        {
            where: {
                id: id
            }
        }
    ).catch((error) => {
        console.log(error);
    });
}