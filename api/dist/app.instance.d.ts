import { INestApplication } from '@nestjs/common';
export declare class AppInstance {
    private static app;
    static setApp(app: INestApplication): void;
    static getApp(): INestApplication;
}
