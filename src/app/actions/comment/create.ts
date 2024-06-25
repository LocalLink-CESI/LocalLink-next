'use server';
import {PostType, prisma} from "@/helpers/database";
import {FormikValues} from "formik";

export default async function CreateComment(form :FormikValues, type: PostType) {
    switch(type) {
        case PostType.DEFAULT :
            return CreateDefaultComment;
        case PostType.CULTURE:
            return CreateCultureComment;
        case PostType.SALE:
            return CreateSaleComment;
        case PostType.EVENT:
            return CreateEventComment;
    }

}

async function CreateDefaultComment(form :FormData, type: PostType) {
    return prisma.comment.create({
        data: {
            text: form.get("text") as string,
            userId: form.get("userId") as string,
            postId: form.get("postId") as unknown as number,
        }
    }).catch((e) => {console.log(e)})
}

async function CreateCultureComment(form :FormData, type: PostType) {
    return prisma.comment.create({
        data: {
            text: form.get("text") as string,
            userId: form.get("userId") as string,
            culturePostId: form.get("postId") as unknown as number,
        }
    }).catch((e) => {console.log(e)})
}

async function CreateSaleComment(form :FormData, type: PostType) {
    return prisma.comment.create({
        data: {
            text: form.get("text") as string,
            userId: form.get("userId") as string,
            salePostId: form.get("postId") as unknown as number,
        }
    }).catch((e) => {console.log(e)})
}

async function CreateEventComment(form :FormData, type: PostType) {
    return prisma.comment.create({
        data: {
            text: form.get("text") as string,
            userId: form.get("userId") as string,
            eventPostId: form.get("postId") as unknown as number,
        }
    }).catch((e) => {console.log(e)})
}