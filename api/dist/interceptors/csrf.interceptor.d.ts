import { CsrfMiddlewareOptions, CsrfInterceptor as NestjsCsrfInterceptor } from '@tekuconcept/nestjs-csrf';
export declare class CsrfInterceptor extends NestjsCsrfInterceptor {
    constructor(options?: CsrfMiddlewareOptions);
}
