import ClientService from "./client.service";
import Cheerio from 'cheerio'
import HttpException from "../utils/exceptions/http.exception";
import GeneralService from "./general.service";
import { children } from "cheerio/lib/api/traversing";
import { attr } from "cheerio/lib/api/attributes";

export default class GetNextPageService {
    private pageIndex: number;
    private clientService = new ClientService()
    private generalService = new GeneralService()

    async getUrl(index: number) {
        const body = await this.clientService.getHtml(process.env.INITIAL as string)
        if (body instanceof HttpException) {
            return body.message
        } else {
            const $ = Cheerio.load(body as unknown as string)

            const { totalPages } = this.generalService.adsAndPages($)

            console.log(totalPages)

            const allPages: Array<{ page: number, url: string }> = []
            for (let i = 1; i <= totalPages; i++) {
                if (i === 1) {
                    allPages.push({
                        page: i,
                        url: process.env.INITIAL as string
                    })
                } else {
                    const url: string = process.env.INITIAL + "&page=" + String(i)
                    allPages.push({
                        page: i,
                        url: url
                    })
                }
            }
            console.log(allPages)
            return allPages
        }
    }
}