import { createStore } from "zustand";

export type User = {
    name: string;
    location: string;
    avatar: string;
    bio: string;
    mail: string;
    posts: Post[];
    id: string;
};

export type UserId = string;

export type Post = {
    userId: UserId;
    content: string;
    image: string;
    interactions: {
        likes: number;
        comments: number;
    };
};

type UserStore = {
    user: User;
    setUser: (user: User) => void;
};

const defaultUser: User = {
    id: "1",
    name: "Lilith Smith",
    location: "Rouen, France",
    avatar: "/thispersondoesnotexist.jpg",
    bio: "I love building applications that impact people's lives.",
    mail: "prankex@gmail.com",
    posts: [
        {
            userId: "1",
            content: "Hello again everyone! I just wanted to share this beautiful painting I painted today. I hope you all have a great day!",
            image: "/example2.webp",
            interactions: {
                likes: 158,
                comments: 20
            }
        },
        {
            userId: "1",
            content: "Hi my fellow neighbors! I just joined this app and am quite unsure as to what the next steps might be for me here. I would appreciate any help or guidance you can offer me. Below is a picture of trying trying to piece out how to use this thing. Thanks! 🙏",
            image: "/example1.png",
            interactions: {
                likes: 10,
                comments: 4
            }
        },
    ]
};

export const userStore = createStore<UserStore>((set) => ({
    user: defaultUser,
    setUser: (user) => set({ user }),
}));


export const createUserStore = (
    initState: User = defaultUser,
) => {
    return createStore<User>()((set) => ({
        ...initState,
        setUser: (user: User) => set(user)
    }))
}
