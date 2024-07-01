export interface Like {
    id: bigint;
    postId: bigint;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}