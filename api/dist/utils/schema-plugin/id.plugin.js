"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function idPlugin(schema, _options) {
    schema.set('toJSON', {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        },
        virtuals: true,
    });
}
exports.default = idPlugin;
//# sourceMappingURL=id.plugin.js.map