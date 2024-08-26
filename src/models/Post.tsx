export interface Post {
    id: bigint;
    title: string;
    content: string;
    publishedAt: Date;
    authorId: bigint;
}

export enum PostType {
    REGULAR = 'REGULAR',
    EVENT = 'EVENT',
    SALE = 'SALE',
    CULTURE = 'CULTURE',
}