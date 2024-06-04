'use server'

import {prisma} from "@/helpers/database";

export const getPosts = async () => {
    await prisma.post.findMany();
}

export const getPostsDetails = async () => {
    await prisma.post.findMany();
}