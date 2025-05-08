"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateQueryPipe = void 0;
const common_1 = require("@nestjs/common");
exports.populateQueryPipe = new common_1.ParseArrayPipe({
    items: String,
    separator: ',',
    optional: true,
});
//# sourceMappingURL=populate.js.map