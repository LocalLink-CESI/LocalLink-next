import {PrismaClient} from "@prisma/client";
import {PostType as TruePostType} from ".prisma/client";

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
    'DEFAULT': TruePostType.REGULAR,
    'EVENT': TruePostType.EVENT,
    'CULTURE': TruePostType.CULTURE,
    'SALE': TruePostType.SALE,
}

export type PrismaPostType = 'post' | 'culturePost' | 'eventPost' | 'salePost';
