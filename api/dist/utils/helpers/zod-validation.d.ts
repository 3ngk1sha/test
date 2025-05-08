import { ZodSchema } from 'zod';
export declare function buildZodSchemaValidator<T>(zodSchema: ZodSchema<T>): (data: unknown) => boolean;
