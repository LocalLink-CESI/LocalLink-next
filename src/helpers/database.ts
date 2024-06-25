import {PrismaClient} from "@prisma/client";

export const prisma = new PrismaClient()

export enum PostType {
    DEFAULT = 'post',
    CULTURE = 'culturePost',
    EVENT = 'eventPost',
    SALE = 'salePost',
}

export const postTypeMap = {
    'DEFAULT': 'Post',
    'EVENT': 'Evenement',
    'CULTURE': 'Culture',
    'SALE': 'Vente ou don',
}

export const postTypeValuesMap = {
    'DEFAULT': PostType.DEFAULT,
    'EVENT': PostType.EVENT,
    'CULTURE': PostType.CULTURE,
    'SALE': PostType.SALE,
}

export type PrismaPostType = 'post' | 'culturePost' | 'eventPost' | 'salePost';
