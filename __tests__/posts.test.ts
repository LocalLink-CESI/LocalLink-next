import CreatePost from "@/app/actions/posts/create";
import {PostType} from "@/helpers/database";

test('Valid post creation', async () => {
    let form = new FormData;
    form.set("title","test default post");
    form.set("text","test default post text");
    form.set("media","");
    form.set("isVisible","true");
    form.set("userId","1");
    form.set("cityId","1");
    let response = await CreatePost(
        form,
        PostType.DEFAULT
    );

    console.log(response);

    expect(CreatePost(
        form,
        PostType.DEFAULT
    ));
});