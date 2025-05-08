"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installLanguageFixtures = exports.languageFixtures = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const language_schema_1 = require("../../../i18n/schemas/language.schema");
exports.languageFixtures = [
    {
        title: 'English',
        code: 'en',
        isDefault: true,
        isRTL: false,
    },
    {
        title: 'Français',
        code: 'fr',
        isDefault: false,
        isRTL: false,
    },
];
const installLanguageFixtures = async () => {
    const Language = mongoose_1.default.model(language_schema_1.LanguageModel.name, language_schema_1.LanguageModel.schema);
    return await Language.insertMany(exports.languageFixtures);
};
exports.installLanguageFixtures = installLanguageFixtures;
//# sourceMappingURL=language.js.map