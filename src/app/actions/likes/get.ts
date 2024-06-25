'use server';
import {prisma} from "@/helpers/database";

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