'use server';
import {PostType, prisma} from "@/helpers/database";
import GetLike from "@/app/actions/likes/get";
import {Prisma} from ".prisma/client";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;

export default async function CreateLike(postId: number, userId: string, type: PostType) {
    console.log("type",type);
    switch(type) {
        case PostType.DEFAULT :
            return CreateDefaultLike(postId, userId, type);
        case PostType.CULTURE:
            return CreateCultureLike(postId, userId, type);
        case PostType.SALE:
            return CreateSaleLike(postId, userId, type);
        case PostType.EVENT:
            return CreateEventLike(postId, userId, type);
    }
}

async function CreateDefaultLike(postId: number, userId: string, type: PostType) {
    console.log("Creating default like");
    return prisma.like.create({
        data: {
            userId: userId,
            postId: postId,
        }
    }).catch((e: PrismaClientValidationError) => {console.log(e)})
}

async function CreateCultureLike(postId: number, userId: string, type: PostType) {
    return prisma.like.create({
        data: {
            userId: userId,
            culturePostId: postId,
        }
    }).catch((e) => {console.log(e)})
}

async function CreateSaleLike(postId: number, userId: string, type: PostType) {
    return prisma.like.create({
        data: {
            userId: userId,
            salePostId: postId,
        }
    }).catch((e) => {console.log(e)})
}

async function CreateEventLike(postId: number, userId: string, type: PostType) {
    return prisma.like.create({
        data: {
            userId: userId,
            eventPostId: postId,
        }
    }).catch((e) => {console.log(e)})
}

export async function Like(userId: string, postId: number, type: PostType) {
    let like = await GetLike(postId, userId, type);
    if (like != null && !(like instanceof Error)) {
        await prisma.like.delete({
            where: {
                id: like.id
            }
        });
    } else if (!(like instanceof Error)) {
        console.log("Creating like");
        await CreateLike(postId, userId, type);
    }
}