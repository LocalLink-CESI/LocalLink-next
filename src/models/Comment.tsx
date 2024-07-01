import {User} from "next-auth";
import {Post} from "@/models/Post";

export interface Comment {
    id: bigint;
    text: string;
    createdAt: Date;
    updatedAt: Date;

    userId: string;
    user: User;

    postId: bigint;
    post: Post;
}