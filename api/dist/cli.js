"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_alias_1 = __importDefault(require("module-alias"));
const nest_commander_1 = require("nest-commander");
module_alias_1.default.addAliases({
    '@': __dirname,
});
const app_module_1 = require("./app.module");
async function bootstrap() {
    await nest_commander_1.CommandFactory.run(app_module_1.HexabotModule);
}
bootstrap();
//# sourceMappingURL=cli.js.map