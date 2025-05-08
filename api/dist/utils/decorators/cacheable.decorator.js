"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cacheable = void 0;
function Cacheable(cacheKey) {
    return function (target, propertyName, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            const cache = this.cacheManager;
            if (!cache) {
                throw new Error('Cannot use Cacheable() decorator without injecting the cache manager.');
            }
            try {
                const cachedResult = await cache.get(cacheKey);
                if (cachedResult) {
                    return cachedResult;
                }
            }
            catch (error) {
                console.error(`Cache get error for key: ${cacheKey}:`, error);
            }
            const result = await originalMethod.apply(this, args);
            try {
                await cache.set(cacheKey, result);
            }
            catch (error) {
                console.error(`Cache set error for key: ${cacheKey}:`, error);
            }
            return result;
        };
        return descriptor;
    };
}
exports.Cacheable = Cacheable;
//# sourceMappingURL=cacheable.decorator.js.map