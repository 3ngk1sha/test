"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageQuery = void 0;
const config_1 = require("../../config");
const getPageQuery = (props) => ({
    skip: 0,
    limit: config_1.config.pagination.limit,
    sort: ['createdAt', 'desc'],
    ...props,
});
exports.getPageQuery = getPageQuery;
//# sourceMappingURL=pagination.js.map