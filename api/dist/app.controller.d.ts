import { Request } from 'express';
import { Session as ExpressSession } from 'express-session';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    csrf(session: ExpressSession): {
        _csrf: string;
    };
    cookies(req: Request): string;
}
