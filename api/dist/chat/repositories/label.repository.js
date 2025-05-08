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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_repository_1 = require("../../utils/generics/base-repository");
const label_schema_1 = require("../schemas/label.schema");
let LabelRepository = class LabelRepository extends base_repository_1.BaseRepository {
    constructor(model) {
        super(model, label_schema_1.Label, label_schema_1.LABEL_POPULATE, label_schema_1.LabelFull);
        this.model = model;
    }
    async postCreate(created) {
        this.eventEmitter.emit('hook:label:create', created, async (result) => {
            await this.model.updateOne({ _id: created._id }, {
                $set: {
                    label_id: {
                        ...(created.label_id || {}),
                        ...result,
                    },
                },
            });
        });
    }
    async preDelete(_query, _criteria) {
        const ids = Array.isArray(_criteria._id?.$in)
            ? _criteria._id.$in
            : Array.isArray(_criteria._id)
                ? _criteria._id
                : [_criteria._id];
        const labels = await this.find({ _id: { $in: ids } });
        this.eventEmitter.emit('hook:label:delete', labels);
    }
};
exports.LabelRepository = LabelRepository;
exports.LabelRepository = LabelRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(label_schema_1.Label.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LabelRepository);
//# sourceMappingURL=label.repository.js.map