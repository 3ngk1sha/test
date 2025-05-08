"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionModels = void 0;
const action_type_1 = require("../types/action.type");
const permissionModels = (model, role) => {
    return [
        {
            model,
            action: action_type_1.Action.CREATE,
            role,
        },
        {
            model,
            action: action_type_1.Action.READ,
            role,
        },
        {
            model,
            action: action_type_1.Action.UPDATE,
            role,
        },
        {
            model,
            action: action_type_1.Action.DELETE,
            role,
        },
    ];
};
exports.permissionModels = permissionModels;
//# sourceMappingURL=permission.seed-model.js.map