"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTree = void 0;
const menu_1 = require("../schemas/types/menu");
const verifyMenu = (menu) => {
    if (typeof menu !== 'object')
        return false;
    if (typeof menu.title !== 'string')
        return false;
    if (menu.type === menu_1.MenuType.postback && typeof menu.payload === 'string')
        return true;
    if (menu.type === menu_1.MenuType.web_url &&
        typeof menu.url === 'string' &&
        new URL(menu.url))
        return true;
    if (menu.type === menu_1.MenuType.nested &&
        (menu.call_to_actions === undefined || Array.isArray(menu.call_to_actions)))
        return true;
};
const verifyTree = (menuTree) => {
    if (!Array.isArray(menuTree))
        return true;
    return !menuTree.some((v) => {
        const valid = verifyMenu(v);
        if (valid && v.type === menu_1.MenuType.nested) {
            return !(0, exports.verifyTree)(v.call_to_actions);
        }
        return !valid;
    });
};
exports.verifyTree = verifyTree;
//# sourceMappingURL=verifyTree.js.map