export default class GetNextPageService {
    private pageIndex: number;

    async getUrl (index:number){
        this.pageIndex = index
        return this.pageIndex
    }

}