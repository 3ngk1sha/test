import { ModelDefinition } from '@nestjs/mongoose';
declare enum LifecycleOperation {
    Validate = "validate",
    Save = "save",
    DeleteOne = "deleteOne",
    DeleteMany = "deleteMany",
    FindOneAndUpdate = "findOneAndUpdate",
    UpdateMany = "updateMany"
}
type PreHook = (...args: any[]) => void;
type PostHook = (...args: any[]) => void;
interface LifecycleHook {
    pre: PreHook & {
        execute: (newCallback: PreHook) => void;
    };
    post: PostHook & {
        execute: (newCallback: PostHook) => void;
    };
}
type LifecycleHooks = {
    [op in LifecycleOperation]: LifecycleHook;
};
export declare class LifecycleHookManager {
    private static registry;
    private static createLifecycleCallback;
    static attach(model: ModelDefinition): ModelDefinition;
    static getHooks(modelName: string): LifecycleHooks | undefined;
}
export {};
