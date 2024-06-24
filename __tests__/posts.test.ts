import CreatePost from "../src/app/actions/posts/create";
import {PostType, prisma} from "@/helpers/database";

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