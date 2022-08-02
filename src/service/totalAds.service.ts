import ClientService from "./client.service";
import Cheerio from 'cheerio'
import HttpException from "../utils/exceptions/http.exception";
import GeneralService from "./general.service";
import { children } from "cheerio/lib/api/traversing";
import { attr } from "cheerio/lib/api/attributes";

export default class TotalAdsService {
    private pageIndex: number;
    private clientService = new ClientService()
    private generalService = new GeneralService()

    async totalItems(index: number) :Promise<string | number> {
        const body = await this.clientService.getHtml(process.env.INITIAL as string,index)
        if (body instanceof HttpException) {
            return body.message
        } else {
            const $ = Cheerio.load(body as unknown as string)
            const count = $('main article').length
            return count
        }
    }
}