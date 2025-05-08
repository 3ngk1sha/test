"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = exports.EHook = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const class_transformer_1 = require("class-transformer");
const logger_service_1 = require("../../logger/logger.service");
const lifecycle_hook_manager_1 = require("./lifecycle-hook-manager");
var EHook;
(function (EHook) {
    EHook["preCreateValidate"] = "preCreateValidate";
    EHook["preCreate"] = "preCreate";
    EHook["preUpdateValidate"] = "preUpdateValidate";
    EHook["preUpdate"] = "preUpdate";
    EHook["preUpdateMany"] = "preUpdateMany";
    EHook["preDelete"] = "preDelete";
    EHook["postCreateValidate"] = "postCreateValidate";
    EHook["postCreate"] = "postCreate";
    EHook["postUpdateValidate"] = "postUpdateValidate";
    EHook["postUpdate"] = "postUpdate";
    EHook["postUpdateMany"] = "postUpdateMany";
    EHook["postDelete"] = "postDelete";
})(EHook || (exports.EHook = EHook = {}));
class BaseRepository {
    constructor(model, cls, populate = [], clsPopulate) {
        this.model = model;
        this.cls = cls;
        this.populate = populate;
        this.clsPopulate = clsPopulate;
        this.transformOpts = { excludePrefixes: ['_', 'password'] };
        this.leanOpts = { virtuals: true, defaults: true, getters: true };
        this.registerLifeCycleHooks();
    }
    canPopulate(populate) {
        return populate.some((p) => this.populate.includes(p));
    }
    getEventName(suffix) {
        const entity = this.cls.name.toLocaleLowerCase();
        return `hook:${entity}:${suffix}`;
    }
    registerLifeCycleHooks() {
        const repository = this;
        const hooks = lifecycle_hook_manager_1.LifecycleHookManager.getHooks(this.cls.name);
        if (!hooks) {
            console.warn(`LifeCycleHooks has not been registered for ${this.cls.name}`);
            return;
        }
        hooks.validate.pre.execute(async function () {
            const doc = this;
            await repository.preCreateValidate(doc);
            await repository.eventEmitter.emitAsync(repository.getEventName(EHook.preCreateValidate), doc);
        });
        hooks.validate.post.execute(async function (created) {
            await repository.postCreateValidate(created);
            await repository.eventEmitter.emitAsync(repository.getEventName(EHook.postCreateValidate), created);
        });
        hooks.save.pre.execute(async function () {
            const doc = this;
            await repository.preCreate(doc);
            await repository.eventEmitter.emitAsync(repository.getEventName(EHook.preCreate), doc);
        });
        hooks.save.post.execute(async function (created) {
            await repository.postCreate(created);
            await repository.eventEmitter.emitAsync(repository.getEventName(EHook.postCreate), created);
        });
        hooks.deleteOne.pre.execute(async function () {
            const query = this;
            const criteria = query.getQuery();
            await repository.preDelete(query, criteria);
            await repository.eventEmitter.emitAsync(repository.getEventName(EHook.preDelete), query, criteria);
        });
        hooks?.deleteOne.post.execute(async function (result) {
            const query = this;
            await repository.postDelete(query, result);
            await repository.eventEmitter.emitAsync(repository.getEventName(EHook.postDelete), query, result);
        });
        hooks.deleteMany.pre.execute(async function () {
            const query = this;
            const criteria = query.getQuery();
            await repository.preDelete(query, criteria);
            await repository.eventEmitter.emitAsync(repository.getEventName(EHook.preDelete), query, criteria);
        });
        hooks.deleteMany.post.execute(async function (result) {
            const query = this;
            await repository.postDelete(query, result);
            await repository.eventEmitter.emitAsync(repository.getEventName(EHook.postDelete), query, result);
        });
        hooks.findOneAndUpdate.pre.execute(async function () {
            const query = this;
            const criteria = query.getFilter();
            const updates = query.getUpdate();
            if (!updates) {
                throw new Error('Unable to run findOneAndUpdate pre hook');
            }
            await repository.preUpdate(query, criteria, updates);
            await repository.eventEmitter.emitAsync(repository.getEventName(EHook.preUpdate), criteria, updates?.['$set']);
        });
        hooks.updateMany.pre.execute(async function () {
            const query = this;
            const criteria = query.getFilter();
            const updates = query.getUpdate();
            if (!updates) {
                throw new Error('Unable to execute updateMany() pre-hook');
            }
            await repository.preUpdateMany(query, criteria, updates);
            await repository.eventEmitter.emitAsync(repository.getEventName(EHook.preUpdateMany), criteria, updates?.['$set']);
        });
        hooks.updateMany.post.execute(async function (updated) {
            const query = this;
            await repository.postUpdateMany(query, updated);
            await repository.eventEmitter.emitAsync(repository.getEventName(EHook.postUpdateMany), updated);
        });
        hooks.findOneAndUpdate.post.execute(async function (updated) {
            if (updated) {
                const query = this;
                await repository.postUpdate(query, (0, class_transformer_1.plainToClass)(repository.cls, updated, repository.transformOpts));
                await repository.eventEmitter.emitAsync(repository.getEventName(EHook.postUpdate), updated);
            }
        });
    }
    async execute(query, cls) {
        const resultSet = await query.lean(this.leanOpts).exec();
        return resultSet.map((doc) => (0, class_transformer_1.plainToClass)(cls, doc, this.transformOpts));
    }
    async executeOne(query, cls, options) {
        const doc = await query.lean(this.leanOpts).exec();
        return (0, class_transformer_1.plainToClass)(cls, doc, options ?? this.transformOpts);
    }
    findOneQuery(criteria, projection) {
        if (!criteria) {
            throw new Error('findOneQuery() should not have an empty criteria');
        }
        return typeof criteria === 'string'
            ? this.model.findById(criteria, projection)
            : this.model.findOne(criteria, projection);
    }
    async findOne(criteria, options, projection) {
        if (!criteria) {
            return null;
        }
        const query = this.findOneQuery(criteria, projection);
        return await this.executeOne(query, this.cls, options);
    }
    async findOneAndPopulate(criteria, projection) {
        this.ensureCanPopulate();
        const query = this.findOneQuery(criteria, projection).populate(this.populate);
        return await this.executeOne(query, this.clsPopulate);
    }
    findQuery(filter, pageQuery, projection) {
        if (Array.isArray(pageQuery)) {
            const query = this.model.find(filter, projection);
            return query.sort([pageQuery]);
        }
        const { skip = 0, limit = 0, sort = ['createdAt', 'asc'], } = pageQuery || {};
        const query = this.model.find(filter, projection);
        return query
            .skip(skip)
            .limit(limit)
            .sort([sort]);
    }
    async find(filter, pageQuery, projection) {
        if (Array.isArray(pageQuery)) {
            const query = this.findQuery(filter, pageQuery, projection);
            return await this.execute(query, this.cls);
        }
        const query = this.findQuery(filter, pageQuery, projection);
        return await this.execute(query, this.cls);
    }
    ensureCanPopulate() {
        if (!this.populate || !this.clsPopulate) {
            throw new Error('Cannot populate query');
        }
    }
    async findAndPopulate(filters, pageQuery, projection) {
        this.ensureCanPopulate();
        if (Array.isArray(pageQuery)) {
            const query = this.findQuery(filters, pageQuery, projection).populate(this.populate);
            return await this.execute(query, this.clsPopulate);
        }
        const query = this.findQuery(filters, pageQuery, projection).populate(this.populate);
        return await this.execute(query, this.clsPopulate);
    }
    findAllQuery(sort) {
        return this.findQuery({}, { limit: 0, skip: 0, sort });
    }
    async findAll(sort) {
        return await this.find({}, { limit: 0, skip: 0, sort });
    }
    async findAllAndPopulate(sort) {
        this.ensureCanPopulate();
        const query = this.findAllQuery(sort).populate(this.populate);
        return await this.execute(query, this.clsPopulate);
    }
    findPageQuery(filters, { skip = 0, limit = 0, sort }) {
        return this.findQuery(filters)
            .skip(skip)
            .limit(limit)
            .sort([sort]);
    }
    async findPage(filters, pageQuery) {
        const query = this.findPageQuery(filters, pageQuery);
        return await this.execute(query, this.cls);
    }
    async findPageAndPopulate(filters, pageQuery) {
        this.ensureCanPopulate();
        const query = this.findPageQuery(filters, pageQuery).populate(this.populate);
        return await this.execute(query, this.clsPopulate);
    }
    async countAll() {
        return await this.model.estimatedDocumentCount().exec();
    }
    async count(criteria) {
        return await this.model.countDocuments(criteria).exec();
    }
    async create(dto) {
        const doc = await this.model.create(dto);
        return (0, class_transformer_1.plainToClass)(this.cls, doc.toObject(this.leanOpts), this.transformOpts);
    }
    async createMany(dtoArray) {
        const docs = await this.model.create(dtoArray);
        return docs.map((doc) => (0, class_transformer_1.plainToClass)(this.cls, doc.toObject(this.leanOpts), this.transformOpts));
    }
    async updateOne(criteria, dto, options = {
        new: true,
    }) {
        const query = this.model.findOneAndUpdate({
            ...(typeof criteria === 'string' ? { _id: criteria } : criteria),
        }, {
            $set: dto,
        }, options);
        const filterCriteria = query.getFilter();
        const queryUpdates = query.getUpdate();
        if (!queryUpdates) {
            throw new Error('Unable to execute updateOne() - No updates');
        }
        await this.preUpdateValidate(filterCriteria, queryUpdates);
        await this.eventEmitter.emitAsync(this.getEventName(EHook.preUpdateValidate), filterCriteria, queryUpdates);
        await this.postUpdateValidate(filterCriteria, queryUpdates);
        await this.eventEmitter.emitAsync(this.getEventName(EHook.postUpdateValidate), filterCriteria, queryUpdates);
        const result = await this.executeOne(query, this.cls);
        if (!result) {
            const errorMessage = `Unable to update ${this.cls.name} with ${typeof criteria === 'string' ? 'ID' : 'criteria'} ${JSON.stringify(criteria)}`;
            throw new Error(errorMessage);
        }
        return result;
    }
    async updateMany(filter, dto) {
        return await this.model.updateMany(filter, {
            $set: dto,
        });
    }
    async deleteOne(criteria) {
        return await this.model
            .deleteOne(typeof criteria === 'string' ? { _id: criteria } : criteria)
            .exec();
    }
    async deleteMany(criteria) {
        return await this.model.deleteMany(criteria);
    }
    async preCreateValidate(_doc, _filterCriteria, _updates) {
    }
    async postCreateValidate(_validated) {
    }
    async preUpdateValidate(_filterCriteria, _updates) {
    }
    async postUpdateValidate(_filterCriteria, _updates) {
    }
    async preCreate(_doc) {
    }
    async postCreate(_created) {
    }
    async preUpdate(_query, _criteria, _updates) {
    }
    async preUpdateMany(_query, _criteria, _updates) {
    }
    async postUpdateMany(_query, _updated) {
    }
    async postUpdate(_query, _updated) {
    }
    async preDelete(_query, _criteria) {
    }
    async postDelete(_query, _result) {
    }
}
exports.BaseRepository = BaseRepository;
__decorate([
    (0, common_1.Inject)(event_emitter_1.EventEmitter2),
    __metadata("design:type", event_emitter_1.EventEmitter2)
], BaseRepository.prototype, "eventEmitter", void 0);
__decorate([
    (0, common_1.Inject)(logger_service_1.LoggerService),
    __metadata("design:type", logger_service_1.LoggerService)
], BaseRepository.prototype, "logger", void 0);
//# sourceMappingURL=base-repository.js.map