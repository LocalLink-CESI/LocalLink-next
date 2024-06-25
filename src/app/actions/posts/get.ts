'use server';

import {PostType, prisma} from '@/helpers/database';
import {getServerSession} from "next-auth";
import {useSession} from "next-auth/react";
import {authOptions} from "@/lib/authOptions";

export default async function GetPostsWithPaginationAndType (pagination: {limit:number, offset:number}, type: PostType, cityId: number) : Promise<Array<any>> {
    // @ts-ignore
    return prisma[type as string].findMany({
        take: pagination.limit,
        skip: pagination.offset,
        orderBy: {
            createdAt: 'desc'
        },
        where: {
            cityId: cityId
        }
    }).catch((e: Error) => {
        return (e);
    });
}

export async function GetPostsWithPaginationFeed (pagination: {limit:number, offset:number}, cityId: number) {
    let posts = [];
    let defaultPosts = await GetPostsWithPaginationAndType(pagination, PostType.DEFAULT, cityId);
    let culturePosts = await GetPostsWithPaginationAndType(pagination, PostType.CULTURE, cityId);
    let salePosts = await GetPostsWithPaginationAndType(pagination, PostType.SALE, cityId);
    let eventPosts = await GetPostsWithPaginationAndType(pagination, PostType.EVENT, cityId);

    posts.push(defaultPosts);
    posts.push(culturePosts);
    posts.push(salePosts);
    posts.push(eventPosts);

    let types = [PostType.DEFAULT, PostType.CULTURE, PostType.SALE, PostType.EVENT];
    let finalPosts = [];
    //add the key type to all nested post
    posts.forEach((postType, value) => {
        postType.forEach((post) => {
            post.type = types[value];
            finalPosts.push(post);
        });
    });

    return finalPosts;
}

export async function GetPostWithId (id: number) {
    return prisma.post.findUnique({
        where: {
            id: id
        }
    }).catch((e: Error) => {
        return (e);
    });
}

export async function GetSelfPosts (id: string) {
    return prisma.post.findMany({
        where: {
            userId: id
        }
    }).catch((e: Error) => {
        return (e);
    });
}
