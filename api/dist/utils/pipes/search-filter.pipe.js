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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchFilterPipe = void 0;
const common_1 = require("@nestjs/common");
const escapeRegExp_1 = __importDefault(require("lodash/escapeRegExp"));
const mongoose_1 = require("mongoose");
let SearchFilterPipe = class SearchFilterPipe {
    constructor(props) {
        this.props = props;
    }
    getNullableValue(val) {
        return val === 'null' ? undefined : val;
    }
    getRegexValue(val) {
        const escapedRegExp = (0, escapeRegExp_1.default)(val);
        return new RegExp(escapedRegExp, 'i');
    }
    isAllowedField(field) {
        if (this.props.allowedFields.includes(field))
            return true;
        common_1.Logger.warn(`Field ${field} is not allowed`);
        return false;
    }
    transformField(field, val) {
        if (['id'].includes(field)) {
            if (mongoose_1.Types.ObjectId.isValid(String(val))) {
                return {
                    _operator: 'eq',
                    data: {
                        [field === 'id' ? '_id' : field]: this.getNullableValue(String(val)),
                    },
                };
            }
            return {};
        }
        else if (val?.['contains'] || val?.[field]?.['contains']) {
            return {
                _operator: 'iLike',
                data: {
                    [field]: this.getRegexValue(String(val['contains'] || val[field]['contains'])),
                },
            };
        }
        else if (val?.['!=']) {
            return {
                _operator: 'neq',
                data: {
                    [field]: this.getNullableValue(val['!=']),
                },
            };
        }
        return {
            _operator: 'eq',
            data: {
                [field]: Array.isArray(val)
                    ? val.map((v) => this.getNullableValue(v)).filter((v) => v)
                    : this.getNullableValue(String(val)),
            },
        };
    }
    async transform(value, _metadata) {
        const whereParams = value['where'] ?? {};
        const filters = [];
        if (whereParams?.['or']) {
            Object.values(whereParams['or'])
                .filter((val) => val && this.isAllowedField(Object.keys(val)[0]))
                .map((val) => {
                if (!val)
                    return false;
                const [field] = Object.keys(val);
                const filter = this.transformField(field, val?.[field]);
                if (filter._operator)
                    filters.push({
                        ...filter,
                        _context: 'or',
                    });
            });
        }
        delete whereParams['or'];
        if (whereParams) {
            Object.entries(whereParams)
                .filter(([field]) => this.isAllowedField(field))
                .forEach(([field, val]) => {
                const filter = this.transformField(field, val);
                if (filter._operator) {
                    filters.push({
                        ...filter,
                        _context: 'and',
                    });
                }
            });
        }
        return filters.reduce((acc, { _context, _operator, data, ...filter }) => {
            switch (_operator) {
                case 'neq':
                    return {
                        ...acc,
                        $nor: [...(acc?.$nor || []), { ...filter, ...data }],
                    };
                default:
                    switch (_context) {
                        case 'or':
                            return {
                                ...acc,
                                $or: [...(acc?.$or || []), { ...filter, ...data }],
                            };
                        case 'and':
                            return {
                                ...acc,
                                $and: [...(acc?.$and || []), { ...filter, ...data }],
                            };
                        default:
                            return acc;
                    }
            }
        }, {});
    }
};
exports.SearchFilterPipe = SearchFilterPipe;
exports.SearchFilterPipe = SearchFilterPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], SearchFilterPipe);
//# sourceMappingURL=search-filter.pipe.js.map