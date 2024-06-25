'use server';
import {prisma} from "@/helpers/database";

export default async function RemoveLike (id: number) {
    return prisma.like.delete({
        where: {
            id: id
        }
    }).catch((e: Error) => {
        return e
    })
}