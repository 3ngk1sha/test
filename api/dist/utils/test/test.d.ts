import { MongooseModuleOptions } from '@nestjs/mongoose';
export declare const rootMongooseTestModule: (fixturesFn: (...args: any) => Promise<any>, options?: MongooseModuleOptions) => import("@nestjs/common").DynamicModule;
export declare const closeInMongodConnection: () => Promise<void>;
