import axios, { AxiosResponse } from 'axios'
import HttpException from '../utils/exceptions/http.exception'
export default class ClientService{
    async getHtml(url:string, param ? :string|number): Promise<AxiosResponse>{
        try {
            const endpoint = param ? url+"/"+param : url;
            const body = await axios.get(endpoint)
            return body
        } catch (error) {
            throw new HttpException(400,"Something went wrong")
        }
    }
}