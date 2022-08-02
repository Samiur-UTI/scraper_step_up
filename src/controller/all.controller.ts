import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../utils/interfaces/controller.interface';
import HttpException from '../utils/exceptions/http.exception';
import AllService from '../service/all.service';

class AllController implements Controller {
    public path = '/all';
    public router = Router();
    private allService = new AllService();

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

            const ads = await this.allService.everyAds();

            res.status(201).json({ ads });
        } catch (error) {
            next(new HttpException(400, 'Cannot find ads'));
        }
    };
}

export default AllController;