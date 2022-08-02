import ClientService from "./client.service";
import Cheerio from 'cheerio'
import HttpException from "../utils/exceptions/http.exception";
import { Ads, AdDetails, Translation } from '../utils/interfaces/entities.interface'

const translateObj: Translation = {
    Rokprodukcji: "production_date",
    Przebieg: "milage",
    Moc: "power"
}

export default class ScrapeTruckItemService {
    private pageIndex: number;
    private clientService = new ClientService()

    async getDetails(ads: Ads[]): Promise<(string | AdDetails)[]> {
        const exp = ads.map(ad => ad.url)
        const allAds = await Promise.all(exp.map(async e => {
            const body = await this.clientService.getHtml(e as string)
            if (body instanceof HttpException) {
                return body.message
            } else {
                return this.getDetail(body as unknown as string)
            }
        }))
        console.log(allAds)
        return allAds
    }
    async getDetail(html: string): Promise<AdDetails> {
        const $ = Cheerio.load(html as unknown as string)
        const details: AdDetails = {
            id: "",
            price: "",
            registration_date: "",
            production_date: "",
            milage: "",
            power: ""

        }
        //The data is provided in polish, so had to do some manual translation and store them in an object to properly parse the data

        //Production date, milage and power
        const dummyArr: Array<string> = []
        $('.offer-params__list').children().each((i, el) => {
            let item = String($(el).text()).trim().split("\n")
            item.forEach((item) => {
                if (item.trim().length !== 0) {
                    dummyArr.push(item.trim())
                }
            })
        })
        const cleanedArr: Array<string> = dummyArr.map(item => item.replace(/\s/g, ""))
        for (let i = 0; i < cleanedArr.length - 1; i++) {
            if (cleanedArr[i] in translateObj) {
                details[(translateObj[cleanedArr[i] as keyof Translation]) as keyof AdDetails] = cleanedArr[i + 1]

            }
        }
        //Price, id and register date
        const priceDirty = $(".offer-price__number").text().trim().split("\n")
        const priceCleaned = priceDirty.map(el => el.replace(/\s/g, ""))
        details["price"] = priceCleaned[0]
        const idDirty = $("#ad_id").text()
        const idArr = idDirty.split("")
        const freshId = idArr.splice(0, idArr.length / 2).join("")
        details["id"] = freshId
        const date = ($(".offer-meta__value").first().text()).trim().split("\n")
        details["registration_date"] = date[0]

        return details
    }
}