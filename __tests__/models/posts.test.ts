import CreatePost from "@/app/actions/posts/create";
import {PostType} from ".prisma/client";
import DeletePost from "@/app/actions/posts/delete";
import {getServerSession} from "next-auth";
import {GetAllPosts, GetCityPosts, GetPostById} from "@/app/actions/posts/get";
jest.mock("next-auth");

test('Valid post creation', async () => {
    let response = await CreatePost(
        {
            title: "test default post",
            text: "test default post text",
            media: "",
            type: PostType.REGULAR,
            isVisible: "true",
            userId: "cm0beis600001zd38r00ojc46",
            cityId: 1
        },
    );
    expect(response).toHaveProperty("id");
    expect(response).toHaveProperty("title");
    expect(response).toHaveProperty("text");
});

test('Invalid post creation without user', async () => {
    let response = await CreatePost(
        {
            title: "test default post",
            text: "test default post text",
            media: "",
            isVisible: "true",
            userId: "",
            cityId: 1,
            type: PostType.REGULAR
        },
    );
    expect(response).toBe(undefined);
});

test('Valid list post', async () => {
    let response = await GetAllPosts();

    if (response instanceof Array)
    expect(response.length).toBeGreaterThan(0);
    else
        throw Error("Invalid response");

});

test('Invalid list post without city', async () => {
    let response = await GetCityPosts(
        -1,
        10,
        0
    );

    expect(response).toStrictEqual([]);
});

test('Valid get post by id', async () => {
    let post = await GetAllPosts();
    let response = await GetPostById(post[0].id);

    expect(response).toHaveProperty("id");
    expect(response).toHaveProperty("title");
    expect(response).toHaveProperty("text");
});

test('Invalid get post by id', async () => {
    let response = await GetPostById(100000000);

    expect(response).toBeNull();
});

test('Invalid get post by id with negative id', async () => {
    let response = await GetPostById(-100000000);

    expect(response).toBeNull();
});

test('Valid delete post', async () => {
        const mockSession = {
            expires: new Date(Date.now() + 2 * 86400).toISOString(),

                user: {
                    email: "john.doe@example.com",
                    id: "cm0beis600001zd38r00ojc46",
                    cityId: 1,
                    role: "USER",
                }

        };
    (getServerSession as jest.Mock).mockImplementation(() => Promise.resolve(mockSession));
    let cities = await GetAllPosts();

    let response = await DeletePost(cities[0].id);

    expect(response).toHaveProperty("id");
});

test('Invalid delete post with negative id', async () => {
    const mockSession = {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),

        user: {
            email: "john.doe@example.com",
            id: "clxspgy360001fgxtmkfbq5r9",
            cityId: 1,
            role: "USER",
        }

    };
    (getServerSession as jest.Mock).mockImplementation(() => Promise.resolve(mockSession));
    let response = await DeletePost(-1);

    expect(response).toStrictEqual(Error("Post not found"));
});