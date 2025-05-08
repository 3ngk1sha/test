import { CommandRunner } from 'nest-commander';
import { LoggerService } from '@/logger/logger.service';
import { MigrationService } from './migration.service';
export declare class MigrationCommand extends CommandRunner {
    private readonly logger;
    private readonly migrationService;
    constructor(logger: LoggerService, migrationService: MigrationService);
    run(passedParam: string[]): Promise<void>;
    exit(): void;
}
