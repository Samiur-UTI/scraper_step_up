import axios, { AxiosResponse } from 'axios'
import HttpException from '../utils/exceptions/http.exception'
export default class ClientService{
    async getHtml(url:string, param ? :string|number): Promise<AxiosResponse | HttpException>{
        try {
            const endpoint = param ? url+"&page="+param : url;
            const body = await axios.get(endpoint)
            return body.data
        } catch (error) {
            console.log(error)
            return new HttpException(400,"Something went wrong")
        }
    }
}