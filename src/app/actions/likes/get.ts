'use server';
import {PostType, prisma} from "@/helpers/database";

export default async function GetLike(postId: number, userId: string, type: PostType) {
    switch (type) {
        case PostType.DEFAULT :
            return GetDefaultLike(postId, userId, type);
        case PostType.CULTURE:
            return GetCultureLike(postId, userId, type);
        case PostType.SALE:
            return GetSaleLike(postId, userId, type);
        case PostType.EVENT:
            return GetEventLike(postId, userId, type);
    }
}

async function GetDefaultLike(postId: number, userId: string, type: PostType) {
    return prisma.like.findFirst({
        where:{
            userId: userId,
            postId: postId,
        }
    }).catch((e) => {
        return e;
    })
}

async function GetCultureLike(postId: number, userId: string, type: PostType) {
    return prisma.like.findFirst({
        where:{
            userId: userId,
            culturePostId: postId,
        }
    }).catch((e) => {
        return e;
    })
}

async function GetSaleLike(postId: number, userId: string, type: PostType) {
    return prisma.like.findFirst({
        where:{
            userId: userId,
            salePostId: postId,
        }
    }).catch((e) => {
        return e;
    })
}

async function GetEventLike(postId: number, userId: string, type: PostType) {
    return prisma.like.findFirst({
        where:{
            userId: userId,
            eventPostId: postId,
        }
    }).catch((e) => {
        return e;
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
}}