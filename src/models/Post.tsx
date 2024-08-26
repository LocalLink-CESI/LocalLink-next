export interface Post {
    id: bigint;
    title: string;
    content: string;
    publishedAt: Date;
    authorId: bigint;
}

export enum PostType {
    DEFAULT = 'post',
    CULTURE = 'culturePost',
    EVENT = 'eventPost',
    SALE = 'salePost',
}