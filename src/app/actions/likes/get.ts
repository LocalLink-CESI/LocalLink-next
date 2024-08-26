'use server';
import {PostType, prisma} from "@/helpers/database";

export default async function GetLike(postId: number, userId: string) {
    return prisma.like.findFirst({
        where: {
            postId: postId,
            userId: userId
        }
    }).catch((e) => {
        return e;
    });
}

export async function GetLikesByUserId(userId: string) {
    return prisma.like.findMany({
        where: {
            userId: userId
        }
    }).catch((e) => {
        console.log(e)
    })
}

export async function GetLikesByPostId(postId: number) {
    return prisma.like.findMany({
        where: {
            postId: postId
        }
    }).catch((e) => {
        console.log(e)
    })
}