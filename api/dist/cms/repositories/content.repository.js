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
exports.ContentRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_repository_1 = require("../../utils/generics/base-repository");
const content_schema_1 = require("../schemas/content.schema");
let ContentRepository = class ContentRepository extends base_repository_1.BaseRepository {
    constructor(model) {
        super(model, content_schema_1.Content, content_schema_1.CONTENT_POPULATE, content_schema_1.ContentFull);
        this.model = model;
    }
    async preCreate(_doc) {
        _doc.set('rag', this.stringify(_doc.dynamicFields));
    }
    async preUpdate(_query, _criteria, _updates) {
        if ('dynamicFields' in _updates['$set']) {
            _query.set('rag', this.stringify(_updates['$set']['dynamicFields']));
        }
    }
    stringify(obj) {
        return Object.entries(obj).reduce((prev, cur) => `${prev}\n${cur[0]} : ${cur[1]}`, '');
    }
    async textSearch(query) {
        return await this.find({
            $text: {
                $search: query,
                $diacriticSensitive: false,
                $caseSensitive: false,
            },
        });
    }
};
exports.ContentRepository = ContentRepository;
exports.ContentRepository = ContentRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(content_schema_1.Content.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ContentRepository);
//# sourceMappingURL=content.repository.js.map