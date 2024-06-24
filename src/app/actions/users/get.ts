'use server';
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {prisma} from "@/helpers/database";

export default async function GetMe () {
    let user = await getServerSession(authOptions)
    if (!user || !user.user || !user.user.name) return null;
    return prisma.user.findUnique({
        where: {
            id: user.user.name
        }
    }).catch((error: Error) => {
        console.error(error);
        return error;
    });
}

export async function GetUserWithId (id: string) {
    return prisma.user.findUnique({
        where: {
            id: id
        }
    }).catch((error: Error) => {
        console.error(error);
        return error;
    });
}