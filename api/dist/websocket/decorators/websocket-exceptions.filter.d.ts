import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class WebSocketExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
}
