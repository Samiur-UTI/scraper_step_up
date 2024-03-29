import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../utils/interfaces/controller.interface';
import HttpException from '../utils/exceptions/http.exception';
import GetNextPageService from '../service/getNextPageUrl.service'

class GetNextPageController implements Controller {
    public path = '/next';
    public router = Router();
    private GetNextPageService = new GetNextPageService();

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
            const { index } = req.params;

            const ads = await this.GetNextPageService.getUrl(Number(index));

            res.status(201).json({ ads });
        } catch (error) {
            next(new HttpException(400, 'Cannot find ads'));
        }
    };
}

export default GetNextPageController;