import ClientService from "./client.service";
import Cheerio from 'cheerio'
import HttpException from "../utils/exceptions/http.exception";

export default class GetNextPageService {
    private pageIndex: number;
    private clientService = new ClientService()

    async getUrl (index:number){
        this.pageIndex = index
        const body = this.clientService.getHtml("shorturl.at/eqrv4")
        if (body instanceof HttpException){
            return body.message
        }else{
            const $ = Cheerio.load(body as unknown as string)
            console.log($)
        }
    }

}