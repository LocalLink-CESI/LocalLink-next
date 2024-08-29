'use server';
import {prisma} from "@/helpers/database";
import {authOptions} from "@/lib/authOptions";
import {getServerSession} from "next-auth";

export default async function RemoveComment (id: number) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    });

    const comment = await prisma.comment.findUnique({
        where: {
            id: id
        }
    });

    if (!comment) {
        return new Error("Comment not found");
    }

    if (user.id == comment.userId || user.role == "ADMIN") {
        return prisma.comment.delete({
            where: {
                id: id
            }
        }).catch((error: Error) => {
            return error;
        });
    }

    return new Error("Unauthorized");
}