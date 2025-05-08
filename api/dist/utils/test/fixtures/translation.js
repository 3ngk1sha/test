"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installTranslationFixtures = exports.translationFixtures = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const translation_schema_1 = require("../../../i18n/schemas/translation.schema");
exports.translationFixtures = [
    {
        str: 'Welcome',
        translations: {
            en: 'Welcome',
            fr: 'Bienvenue',
        },
    },
];
const installTranslationFixtures = async () => {
    const Translation = mongoose_1.default.model(translation_schema_1.TranslationModel.name, translation_schema_1.TranslationModel.schema);
    return await Translation.insertMany(exports.translationFixtures);
};
exports.installTranslationFixtures = installTranslationFixtures;
//# sourceMappingURL=translation.js.map