import {City} from "@/models/City";
import {Post} from "@/models/Post";

export default interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    bio: string;
    cityId: number;
    image: string;
    role: string;
}

export interface DetailedUser extends User {
    createdAt: Date;
    updatedAt: Date;
    city: City;
    posts: Post[];
}

export interface UserWithToken {
    user: User;
    token: string;
}