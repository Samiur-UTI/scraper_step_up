import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../utils/interfaces/controller.interface';
import HttpException from '../utils/exceptions/http.exception';
import AddItemsService from '../service/addItems.service';

class AddItemsController implements Controller {
    public path = '/additem';
    public router = Router();
    private addItemService = new AddItemsService();

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

            const ads = await this.addItemService.addItems(Number(index));

            res.status(201).json({ ads });
        } catch (error) {
            next(new HttpException(400, 'Cannot fetch ads'));
        }
    };
}

export default AddItemsController;