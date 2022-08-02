import ClientService from "./client.service";
import Cheerio from 'cheerio'
import HttpException from "../utils/exceptions/http.exception";
import GeneralService from "./general.service";
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
        const allInAll = await Promise.all(
            allAdsOnAllPages.map( async (page: Ads[]) =>{
                return await this.scrapeTruckItem.getDetails(page)
            })
        )
        return allInAll
    }
}