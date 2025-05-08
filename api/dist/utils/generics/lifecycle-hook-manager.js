"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifecycleHookManager = void 0;
var LifecycleOperation;
(function (LifecycleOperation) {
    LifecycleOperation["Validate"] = "validate";
    LifecycleOperation["Save"] = "save";
    LifecycleOperation["DeleteOne"] = "deleteOne";
    LifecycleOperation["DeleteMany"] = "deleteMany";
    LifecycleOperation["FindOneAndUpdate"] = "findOneAndUpdate";
    LifecycleOperation["UpdateMany"] = "updateMany";
})(LifecycleOperation || (LifecycleOperation = {}));
class LifecycleHookManager {
    static createLifecycleCallback() {
        let currentCallback = (..._args) => { };
        async function dynamicCallback(...args) {
            await currentCallback.apply(this, args);
        }
        dynamicCallback['execute'] = function (newCallback) {
            if (typeof newCallback !== 'function') {
                throw new Error('Lifecycle callback must be a function');
            }
            currentCallback = newCallback;
        };
        return dynamicCallback;
    }
    static attach(model) {
        const { name, schema } = model;
        const operations = {
            validate: ['pre', 'post'],
            save: ['pre', 'post'],
            deleteOne: ['pre', 'post'],
            deleteMany: ['pre', 'post'],
            findOneAndUpdate: ['pre', 'post'],
            updateMany: ['pre', 'post'],
        };
        const lifecycleHooks = {};
        for (const [op, types] of Object.entries(operations)) {
            const hooks = {
                pre: this.createLifecycleCallback(),
                post: this.createLifecycleCallback(),
            };
            types.forEach((type) => {
                schema[type](op, hooks[type]);
            });
            lifecycleHooks[op] = hooks;
        }
        this.registry[name] = lifecycleHooks;
        return model;
    }
    static getHooks(modelName) {
        return this.registry[modelName];
    }
}
exports.LifecycleHookManager = LifecycleHookManager;
LifecycleHookManager.registry = {};
//# sourceMappingURL=lifecycle-hook-manager.js.map