import { ConsoleLogger } from '@nestjs/common';
export declare class LoggerService extends ConsoleLogger {
    private parentClass;
    constructor(parentClass: object);
    log(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    debug(message: string, ...args: any[]): void;
    verbose(message: string, ...args: any[]): void;
    fatal(message: string, ...args: any[]): void;
    private logArguments;
}
