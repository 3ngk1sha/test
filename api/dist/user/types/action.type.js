"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodToAction = exports.Action = void 0;
var Action;
(function (Action) {
    Action["CREATE"] = "create";
    Action["READ"] = "read";
    Action["UPDATE"] = "update";
    Action["DELETE"] = "delete";
})(Action || (exports.Action = Action = {}));
var MethodToAction;
(function (MethodToAction) {
    MethodToAction["POST"] = "create";
    MethodToAction["GET"] = "read";
    MethodToAction["PATCH"] = "update";
    MethodToAction["DELETE"] = "delete";
})(MethodToAction || (exports.MethodToAction = MethodToAction = {}));
//# sourceMappingURL=action.type.js.map