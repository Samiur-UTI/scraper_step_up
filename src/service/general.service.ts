import ClientService from "./client.service";
import Cheerio from 'cheerio'
import HttpException from "../utils/exceptions/http.exception";
import { children } from "cheerio/lib/api/traversing";
import { attr } from "cheerio/lib/api/attributes";

export default class GeneralService {
    adsAndPages($: cheerio.Root): {
        numberOfAds: number;
        totalPages: number;
    } {
        // Number of ads in one page
        const numAds: number = $('main article').length
        // Number of pages
        const len = $('ul.pagination-list li').length - 2
        let totalPages: string[] = []
        $('ul.pagination-list li').each((i, el) => {
            if (i === len) {
                totalPages = $(el).attr()['aria-label'].match(/\d+/g) as Array<string>
            }
        })
        return {
            numberOfAds: numAds,
            totalPages: Number(totalPages[0])
        }

    }
    adUrlandId($: cheerio.Root): {
        url: string;
        id: string;
    }[] {
        // All ad urls and ids of a page
        const allAds: { url: string; id: string; }[] = []
        $('main > article').each((i, el) => {
            const adUrlMap = {
                url: '',
                id: ''
            }
            adUrlMap.id = $(el).attr()['id']
            adUrlMap.url = $(el).first().children().children().children().attr()['href']
            allAds.push(adUrlMap)
        })
        return allAds
    }
}