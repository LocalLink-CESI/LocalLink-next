export interface Like {
    id: bigint;
    postId: bigint;
    userId: bigint;
    likedAt: Date;
}