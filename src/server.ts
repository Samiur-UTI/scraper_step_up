import 'dotenv/config';
import App from './app';
// import PostController from '@/resources/post/post.controller';
// import UserController from '@/resources/user/user.controller';

const app = new App(
    [],
    Number(process.env.PORT)
);

app.listen();