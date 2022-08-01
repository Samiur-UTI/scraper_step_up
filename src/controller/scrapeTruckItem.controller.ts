import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../utils/interfaces/controller.interface';
import HttpException from '../utils/exceptions/http.exception';
import ScrapeTruckItemService from '../service/scrapeTruckItem.service';
import AddItemsService from '../service/addItems.service';
import {Ads} from '../utils/interfaces/entities.interface'

class ScrapeTruckItemController implements Controller {
    public path = '/scrape';
    public router = Router();
    private scrapeTruckItemService = new ScrapeTruckItemService();
    private addItemService = new AddItemsService()

    constructor() {
        this.initialiseRoutes();
        
    }

    private initialiseRoutes(): void {
        this.router.get(
            `${this.path}`,
            // validationMiddleware(validate.create),
            this.returnUrl
        );
    }

    private returnUrl = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { index } = req.query;

            const allAds = await this.addItemService.addItems(Number(index))

            const post = await this.scrapeTruckItemService.getDetails(allAds as Ads[]);

            res.status(201).json({ post });
        } catch (error) {
            next(new HttpException(400, 'Cannot find ads'));
        }
    };
}

export default ScrapeTruckItemController;