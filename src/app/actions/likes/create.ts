'use server';
import {PostType, prisma} from "@/helpers/database";

export default async function CreateLike(form :FormData, type: PostType) {
    switch(type) {
        case PostType.DEFAULT :
            return CreateDefaultLike;
        case PostType.CULTURE:
            return CreateCultureLike;
        case PostType.SALE:
            return CreateSaleLike;
        case PostType.EVENT:
            return CreateEventLike;
    }

}

async function CreateDefaultLike(form :FormData, type: PostType) {
    return prisma.like.create({
        data: {
            userId: form.get("userId") as string,
            postId: form.get("postId") as unknown as number,
        }
    }).catch((e) => {console.log(e)})
}

async function CreateCultureLike(form :FormData, type: PostType) {
    return prisma.like.create({
        data: {
            userId: form.get("userId") as string,
            culturePostId: form.get("postId") as unknown as number,
        }
    }).catch((e) => {console.log(e)})
}

async function CreateSaleLike(form :FormData, type: PostType) {
    return prisma.like.create({
        data: {
            userId: form.get("userId") as string,
            salePostId: form.get("postId") as unknown as number,
        }
    }).catch((e) => {console.log(e)})
}

async function CreateEventLike(form :FormData, type: PostType) {
    return prisma.like.create({
        data: {
            userId: form.get("userId") as string,
            eventPostId: form.get("postId") as unknown as number,
        }
    }).catch((e) => {console.log(e)})
}