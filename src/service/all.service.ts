import GetNextPageService from "./getNextPageUrl.service";
import AddItemsService from "./addItems.service";
import ScrapeTruckItemService from "./scrapeTruckItem.service";
import {Ads} from '../utils/interfaces/entities.interface'

export default class AllService {
    private getNextPageService = new GetNextPageService()
    private addItemsService = new AddItemsService()
    private scrapeTruckItem = new ScrapeTruckItemService()


    async everyAds(){
        const pages = await this.getNextPageService.getUrl() as Array<{page:number,url:string}>
        const pageIndexes = pages.map((page) => page.page)
        const allAdsOnAllPages : any = await Promise.all( pageIndexes.map(async (page) => {
            return this.addItemsService.addItems(Number(page))
        }))
        // const delay = 40000;
        // Promise.delay = function (t, val) {
        //     return new Promise(resolve => {
        //         setTimeout(resolve.bind(null, val), t);
        //     });
        // }
        // Promise.raceAll = function (promises, timeoutTime, timeoutVal) {
        //     return Promise.all(promises.map(p => {
        //         return Promise.race([p, Promise.delay(timeoutTime, timeoutVal)])
        //     }));
        // }
        const allInAll = await Promise.all(
            allAdsOnAllPages.map( async (page: Ads[]) =>{
                return await this.scrapeTruckItem.getDetails(page)
            })
        )
        return allInAll
    }
}