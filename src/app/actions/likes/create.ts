'use server';
import {PostType, prisma} from "@/helpers/database";
import GetLike from "@/app/actions/likes/get";
import {Prisma} from ".prisma/client";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;

export default async function CreateLike(postId: number, userId: string) {
    return prisma.like.create({
        data: {
            postId: postId,
            userId: userId,
        }
    }).catch((e: PrismaClientValidationError) => {
        return e;
    });
}

export async function Like(userId: string, postId: number) {
    let like = await GetLike(postId, userId);
    if (like != null && !(like instanceof Error)) {
        await prisma.like.delete({
            where: {
                id: like.id
            }
        });
    } else if (!(like instanceof Error)) {
        console.log("Creating like");
        await CreateLike(postId, userId);
    }
}