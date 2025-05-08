import { ModuleMetadata } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
export declare const buildTestingMocks: ({ providers, ...rest }: ModuleMetadata) => Promise<{
    module: TestingModule;
    getMocks: <T extends [new (...args: any[]) => any, ...any[]]>(types: T) => Promise<{ [K in keyof T]: InstanceType<T[K]>; }>;
    resolveMocks: <T extends [new (...args: any[]) => any, ...any[]]>(types: T) => Promise<{ [K in keyof T]: InstanceType<T[K]>; }>;
}>;
