"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSeeder = void 0;
class BaseSeeder {
    constructor(repository) {
        this.repository = repository;
    }
    async findAll() {
        return await this.repository.findAll();
    }
    async isEmpty() {
        const count = await this.repository.countAll();
        return count === 0;
    }
    async seed(models) {
        if (await this.isEmpty()) {
            await this.repository.createMany(models);
            return true;
        }
        return false;
    }
}
exports.BaseSeeder = BaseSeeder;
//# sourceMappingURL=base-seeder.js.map