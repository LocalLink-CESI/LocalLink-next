import CreatePost from "../src/app/actions/posts/create";
import {PostType} from "@/helpers/database";
import GetPostsWithPaginationAndType, {GetPostsWithPaginationFeed, GetPostWithIdAndType} from "@/app/actions/posts/get";
import DeletePost from "@/app/actions/posts/delete";
import {Formik} from "formik";
import {render, screen, waitFor} from '@testing-library/react'
import {getServerSession} from "next-auth";
jest.mock("next-auth");

test('Valid post creation', async () => {
    let response = await CreatePost(
        {
            title: "test default post",
            text: "test default post text",
            media: "",
            isVisible: "true",
            userId: "clxspgy360001fgxtmkfbq5r9",
            cityId: 1
        },
        PostType.DEFAULT
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
            cityId: 1
        },
        PostType.DEFAULT
    );
    expect(response).toBe(null);
});

test('Valid list post', async () => {
    let response = await GetPostsWithPaginationFeed(
        {
            limit: 10,
            offset: 0
        },
        1
    );

    expect(response.length).toBe(2);
});

test('Invalid list post without city', async () => {
    let response = await GetPostsWithPaginationAndType(
        {
            limit: 10,
            offset: 0
        },
        PostType.DEFAULT,
        100000000
    );

    expect(response.length).toBe(0);
});

test('Valid get post by id', async () => {
    let response = await GetPostWithIdAndType(1, PostType.DEFAULT);

    expect(response).toHaveProperty("id");
    expect(response).toHaveProperty("title");
    expect(response).toHaveProperty("text");
});

test('Invalid get post by id', async () => {
    let response = await GetPostWithIdAndType(100000000, PostType.DEFAULT);

    expect(response).toBeNull();
});

test('Invalid get post by id with negative id', async () => {
    let response = await GetPostWithIdAndType(-1, PostType.DEFAULT);

    expect(response).toBeNull();
});

test('Valid delete post', async () => {
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
    let response = await DeletePost(1, PostType.DEFAULT);

    expect(response).toHaveProperty("id");
    expect(response).toHaveProperty("title");
    expect(response).toHaveProperty("text");
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
    let response = await DeletePost(-1, PostType.DEFAULT);

    expect(response).toBeInstanceOf(Error);
});