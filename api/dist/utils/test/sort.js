"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortRowsBy = void 0;
const sort = ({ row1, row2, field = 'createdAt', order = 'desc', }) => (order === 'asc' && row1[field] > row2[field] ? 1 : -1);
const sortRowsBy = (row1, row2, field, order) => sort({ row1, row2, field, order });
exports.sortRowsBy = sortRowsBy;
//# sourceMappingURL=sort.js.map