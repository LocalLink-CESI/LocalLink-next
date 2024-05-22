import {PostType, Prisma} from "@/helpers/database";
import CreatePost from "@/app/actions/posts/create";
import GetPostsWithPaginationAndType from "@/app/actions/posts/get";
import CreateUser from "@/app/actions/users/create";

export default function Home() {
  async function test() {
      let postData = new FormData();
        postData.append('title', 'Hello World');
        postData.append('text', 'This is a test post');
        postData.append('media', '[]');
        postData.append('isVisible', 'trdue');
        postData.append('userId', '1');
        postData.append('cityId', '2');
      //await CreatePost(formData);
    //await GetPostsWithPaginationAndType({limit: 5, offset: 0}, PostType.DEFAULT, 2);

    let userData = new FormData();
        userData.append('name', 'John Doe');  
        userData.append('mail','a@a');
        userData.append('password','123');
        userData.append('cityId','1');
        userData.append('bio','I am a test user');
        userData.append('avatar','[]');
    await CreateUser(userData);
  }
  test();
  return (<></>);
};