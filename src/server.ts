import 'dotenv/config';
import App from './app';
import GetNextPageController from './controller/getNextPageUrl.controller';
import AddItemsController from './controller/addItems.controller';
import TotalAdsController from './controller/totalAds.controller';
import ScrapeTruckItemController from './controller/scrapeTruckItem.controller';
import AllController from './controller/all.controller';
// import PostController from '@/resources/post/post.controller';
// import UserController from '@/resources/user/user.controller';

const app = new App(
    [
        new GetNextPageController(), new AddItemsController(),
        new TotalAdsController(), new ScrapeTruckItemController(),
        new AllController()
    ],
    Number(process.env.PORT)
);

app.listen();