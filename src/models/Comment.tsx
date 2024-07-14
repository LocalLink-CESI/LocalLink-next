export interface Comment {
    id: bigint;
    text: string;
    authorId: bigint;
    postId: bigint;
    createdAt: Date;
    updatedAt: Date;
}