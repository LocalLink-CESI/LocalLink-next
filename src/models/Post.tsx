export interface Post {
    id: bigint;
    title: string;
    content: string;
    publishedAt: Date;
    authorId: bigint;
}