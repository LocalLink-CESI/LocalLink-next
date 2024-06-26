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

    console.log(user);

    if (!user || user.role !== "ADMIN") {
        return new Error("Unauthorized");
    }

    return prisma.user.findMany().catch((error: Error) => {
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