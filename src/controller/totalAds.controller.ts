import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../utils/interfaces/controller.interface';
import HttpException from '../utils/exceptions/http.exception';
import TotalAdsService from '../service/totalAds.service';

class TotalAdsController implements Controller {
    public path = '/total';
    public router = Router();
    private totalAdsService = new TotalAdsService();

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

            const number = await this.totalAdsService.totalItems(Number(index));

            res.status(201).json({ number });
        } catch (error) {
            next(new HttpException(400, 'Cannot create post'));
        }
    };
}

export default TotalAdsController;