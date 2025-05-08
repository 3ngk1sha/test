import { MiddlewareConsumer } from '@nestjs/common';
export interface ChannelModuleOptions {
    folder: string;
}
export declare class ChannelModule {
    configure(consumer: MiddlewareConsumer): void;
}
