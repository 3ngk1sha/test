"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageQueryPipe = void 0;
const config_1 = require("../../config");
const sortTypes = ['asc', 'desc'];
class PageQueryPipe {
    transform(value) {
        let skip = undefined;
        let limit = undefined;
        if (value && 'limit' in value) {
            skip = value.skip && parseInt(value.skip) > -1 ? parseInt(value.skip) : 0;
            limit =
                value.limit && parseInt(value.limit) > 0
                    ? parseInt(value.limit)
                    : config_1.config.pagination.limit;
        }
        const [sortName = 'createdAt', sortType = 'desc'] = value.sort?.split(' ') || [];
        return {
            skip,
            limit,
            sort: [sortName, sortTypes.includes(sortType) ? sortType : 'desc'],
        };
    }
}
exports.PageQueryPipe = PageQueryPipe;
//# sourceMappingURL=pagination-query.pipe.js.map