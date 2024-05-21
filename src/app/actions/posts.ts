'use server'

import prisma from "@/utils/db";

export const getPosts = async () => {
    await prisma.post.findMany({include: {likes: true}});
}

export const getPostsDetails = async () => {
    await prisma.post.findMany({include: {likes: true, comments: true}});
}