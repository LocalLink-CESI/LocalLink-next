'use server';
import {PostType, prisma} from '@/helpers/database';
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";

export default async function DeletePost(id: number, type: PostType) {
    // check if user is allowed to delete post
    const session = await getServerSession(authOptions);

    if (!session) {
        return new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    });


    const post = await prisma[type as string].findUnique({
        where: {
            id: id
        }
    });


    if (user.role !== "ADMIN" || user.id !== post.userId) {
        return prisma[type as string].delete({
            where: {
                id: id
            }
        }).catch((error: Error) => {
            return error;
        });
    }

    return new Error("Unauthorized");
}