import CreatePost from "../src/app/actions/posts/create";
import {PostType, prisma} from "@/helpers/database";
import GetPostsWithPaginationAndType, {GetPostWithId} from "@/app/actions/posts/get";
import DeletePost from "@/app/actions/posts/delete";

test('Valid post creation', async () => {
    let form = new FormData;
    form.set("title","test default post");
    form.set("text","test default post text");
    form.set("media","");
    form.set("isVisible","true");
    form.set("userId","clxspgy360001fgxtmkfbq5r9");
    form.set("cityId","1");
    let response = await CreatePost(
        form,
        PostType.DEFAULT
    );
    expect(response).toHaveProperty("id");
    expect(response).toHaveProperty("title");
    expect(response).toHaveProperty("text");
});

test('Invalid post creation without user', async () => {
    let form = new FormData;
    form.set("title","test default post");
    form.set("text","test default post text");
    form.set("media","");
    form.set("isVisible","true");
    form.set("userId","");
    form.set("cityId","1");
    let response = await CreatePost(
        form,
        PostType.DEFAULT
    );
    expect(response).toBeInstanceOf(Error);
});

test('Valid list post', async () => {
    let response = await GetPostsWithPaginationAndType(
        {
            limit: 10,
            offset: 0
        },
        PostType.DEFAULT,
        1
    );

    expect(response.length).toBe(1);
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
    let response = await GetPostWithId(1);

    expect(response).toHaveProperty("id");
    expect(response).toHaveProperty("title");
    expect(response).toHaveProperty("text");
});

test('Invalid get post by id', async () => {
    let response = await GetPostWithId(100000000);

    expect(response).toBeNull();
});

test('Invalid get post by id with negative id', async () => {
    let response = await GetPostWithId(-1);

    expect(response).toBeNull();
});

test('Valid delete post', async () => {
    let response = await DeletePost(1, PostType.DEFAULT);

    expect(response).toHaveProperty("id");
    expect(response).toHaveProperty("title");
    expect(response).toHaveProperty("text");
});

test('Invalid delete post with negative id', async () => {
    let response = await DeletePost(-1, PostType.DEFAULT);

    expect(response).toBeInstanceOf(Error);
});