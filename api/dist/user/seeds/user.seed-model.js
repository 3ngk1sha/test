"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModels = void 0;
const userModels = (roles) => {
    return [
        {
            username: 'admin',
            first_name: 'admin',
            last_name: 'admin',
            email: 'admin@admin.admin',
            password: 'adminadmin',
            roles,
            avatar: null,
        },
    ];
};
exports.userModels = userModels;
//# sourceMappingURL=user.seed-model.js.map