export interface Post {
    id: bigint;
    title: string;
    content: string;
    type: PostType;
    cityId: bigint;
    userId: bigint;
    createdAt: Date;
    updatedAt: Date;
}

export enum PostType {
    DEFAULT = 'post',
    CULTURE = 'culturePost',
    EVENT = 'eventPost',
    SALE = 'salePost',
}