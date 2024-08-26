'use server';
import {PostType, prisma} from '@/helpers/database';
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";
import {instanceOf} from "prop-types";

export default async function DeletePost(id: number) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    });


    const post = await prisma.post.findUnique({
        where: {
            id: id
        }
    });

    if (!post) {
        return new Error("Post not found");
    }

    if (user.id == post.userId || user.role == "ADMIN") {
        return prisma.post.delete({
            where: {
                id: id
            }
        }).catch((error: Error) => {
            return error;
        });
    }

    return new Error("Unauthorized");
}