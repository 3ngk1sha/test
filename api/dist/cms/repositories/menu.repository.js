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
exports.MenuRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_repository_1 = require("../../utils/generics/base-repository");
const menu_schema_1 = require("../schemas/menu.schema");
const menu_1 = require("../schemas/types/menu");
let MenuRepository = class MenuRepository extends base_repository_1.BaseRepository {
    constructor(model) {
        super(model, menu_schema_1.Menu, menu_schema_1.MENU_POPULATE, menu_schema_1.MenuFull);
        this.model = model;
    }
    async preCreate(_doc) {
        if (_doc) {
            const modifiedPaths = _doc.modifiedPaths();
            if (!_doc?.isNew) {
                if (modifiedPaths.includes('type'))
                    throw new Error("Illegal Update: can't update type");
            }
            switch (_doc.type) {
                case menu_1.MenuType.postback:
                    if (!modifiedPaths.includes('payload'))
                        throw new Error("Menu Validation Error: doesn't include payload for type postback");
                    break;
                case menu_1.MenuType.web_url:
                    if (!modifiedPaths.includes('url'))
                        throw new Error("Menu Validation Error: doesn't include url for type web_url");
                    break;
                default:
                    break;
            }
        }
    }
};
exports.MenuRepository = MenuRepository;
exports.MenuRepository = MenuRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(menu_schema_1.Menu.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MenuRepository);
//# sourceMappingURL=menu.repository.js.map