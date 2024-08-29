'use server';
import {prisma} from "@/helpers/database";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";

export default async function RemoveLike (id: number) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    });

    const like = await prisma.like.findUnique({
        where: {
            id: id
        }
    });

    if (!like) {
        return new Error("Like not found");
    }

    if (user.id == like.userId || user.role == "ADMIN") {
        return prisma.like.delete({
            where: {
                id: id
            }
        }).catch((error: Error) => {
            return error;
        });
    }
}