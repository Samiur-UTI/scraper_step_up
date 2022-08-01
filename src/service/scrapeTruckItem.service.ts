import ClientService from "./client.service";
import Cheerio from 'cheerio'
import HttpException from "../utils/exceptions/http.exception";
import {Ads,AdDetails,Translation} from '../utils/interfaces/entities.interface'

const translateObj: Translation = {
    Rokprodukcji: "production_date",
    Przebieg: "milage",
    Moc: "power"
}

export default class ScrapeTruckItemService {
    private pageIndex: number;
    private clientService = new ClientService()

    async getDetails(ads: Ads[] ) :Promise<string | void> {
        const exp = ads[0].url
        const body = await this.clientService.getHtml(exp as string)
        if(body instanceof HttpException){
            return body.message
        }else{
            const $ = Cheerio.load(body as unknown as string)
            const details : AdDetails = {
                id: "",
                price:"",
                registration_date:"",
                production_date:"",
                milage:"",
                power:""

            }
            const dummyArr: Array<string> = []
            $('.offer-params__list').children().each((i,el) => {
                let item = String($(el).text()).trim().split("\n")
                item.forEach((item) => {
                    if(item.trim().length !== 0){
                        dummyArr.push(item.trim())
                    }
                })
            })
            const cleanedArr : Array<string> = dummyArr.map(item => item.replace(/\s/g, ""))
            for(let i =0;i<cleanedArr.length-1;i++){
                if(cleanedArr[i] in translateObj){
                    details[(translateObj[cleanedArr[i] as keyof Translation]) as keyof AdDetails] = cleanedArr[i+1]
                    
                }
            }
            
        }
    }
}