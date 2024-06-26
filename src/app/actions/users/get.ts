'use server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import { prisma } from "@/helpers/database";

export async function GetAllUsers() {
    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    });

    if (user.role !== "ADMIN") return new Error("Unauthorized");

    return prisma.user.findMany().catch((error: Error) => {
        return error;
    });
}

export default async function GetMe() {
    let user = await getServerSession(authOptions)
    if (!user || !user.user || !user.user.name) return null;
    return prisma.user.findUnique({
        where: {
            id: user.user.name
        }
    }).catch((error: Error) => {
        return error;
    });
}

export async function GetUserWithId(id: string) {
    return prisma.user.findUnique({
        where: {
            id: id
        },
        include: {
            city: true
        }
    }).catch((error: Error) => {
        return error;
    });
}

export async function GetUserWithEmail(email: string) {
    return prisma.user.findUnique({
        where: {
            email: email
        }
    }).catch((error: Error) => {
        return error;
    });
}