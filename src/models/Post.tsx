import {City} from "@/models/City";
import {User} from "@/models/User";
import {Like} from "@/models/Like";

export interface Post {
    id: bigint;
    title: string;
    text: string;
    media: any;

    createdAt: Date;
    updatedAt: Date;

    userId: string;
    user: User;

    cityId: number;
    city: City;

    likes: Like[];
    comments: Comment[];
    notifications: Notification[];
}