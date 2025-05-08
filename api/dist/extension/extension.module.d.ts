import { OnApplicationBootstrap } from '@nestjs/common';
import { LoggerService } from '@/logger/logger.service';
import { CleanupService } from './cleanup.service';
export declare class ExtensionModule implements OnApplicationBootstrap {
    private readonly loggerService;
    private readonly cleanupService;
    constructor(loggerService: LoggerService, cleanupService: CleanupService);
    onApplicationBootstrap(): Promise<void>;
}
