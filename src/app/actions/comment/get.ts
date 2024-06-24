'use server';

import {prisma} from "@/helpers/database";

export default async function GetCommentWithPostId(postId: number) {
    return prisma.comment.findMany({
        where: {
            postId: postId
        }
    }).catch((e) => {
        return e;
    });
}