import {City} from "@/models/City";
import {Post} from "@/models/Post";
import {Like} from "@/models/Like";

export default interface User {
    id: string;
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
    likes: Like[];
}
