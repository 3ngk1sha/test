"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const category_seed_1 = require("./chat/seeds/category.seed");
const category_seed_model_1 = require("./chat/seeds/category.seed-model");
const context_var_seed_1 = require("./chat/seeds/context-var.seed");
const context_var_seed_model_1 = require("./chat/seeds/context-var.seed-model");
const language_seed_1 = require("./i18n/seeds/language.seed");
const language_seed_model_1 = require("./i18n/seeds/language.seed-model");
const translation_seed_1 = require("./i18n/seeds/translation.seed");
const translation_seed_model_1 = require("./i18n/seeds/translation.seed-model");
const logger_service_1 = require("./logger/logger.service");
const nlp_entity_seed_1 = require("./nlp/seeds/nlp-entity.seed");
const nlp_entity_seed_model_1 = require("./nlp/seeds/nlp-entity.seed-model");
const nlp_value_seed_1 = require("./nlp/seeds/nlp-value.seed");
const nlp_value_seed_model_1 = require("./nlp/seeds/nlp-value.seed-model");
const metadata_seed_1 = require("./setting/seeds/metadata.seed");
const metadata_seed_model_1 = require("./setting/seeds/metadata.seed-model");
const setting_seed_1 = require("./setting/seeds/setting.seed");
const setting_seed_model_1 = require("./setting/seeds/setting.seed-model");
const model_seed_1 = require("./user/seeds/model.seed");
const model_seed_model_1 = require("./user/seeds/model.seed-model");
const permission_seed_1 = require("./user/seeds/permission.seed");
const permission_seed_model_1 = require("./user/seeds/permission.seed-model");
const role_seed_1 = require("./user/seeds/role.seed");
const role_seed_model_1 = require("./user/seeds/role.seed-model");
const user_seed_1 = require("./user/seeds/user.seed");
const user_seed_model_1 = require("./user/seeds/user.seed-model");
async function seedDatabase(app) {
    const logger = await app.resolve(logger_service_1.LoggerService);
    const modelSeeder = app.get(model_seed_1.ModelSeeder);
    const categorySeeder = app.get(category_seed_1.CategorySeeder);
    const contextVarSeeder = app.get(context_var_seed_1.ContextVarSeeder);
    const roleSeeder = app.get(role_seed_1.RoleSeeder);
    const settingSeeder = app.get(setting_seed_1.SettingSeeder);
    const metadataSeeder = app.get(metadata_seed_1.MetadataSeeder);
    const permissionSeeder = app.get(permission_seed_1.PermissionSeeder);
    const userSeeder = app.get(user_seed_1.UserSeeder);
    const languageSeeder = app.get(language_seed_1.LanguageSeeder);
    const translationSeeder = app.get(translation_seed_1.TranslationSeeder);
    const nlpEntitySeeder = app.get(nlp_entity_seed_1.NlpEntitySeeder);
    const nlpValueSeeder = app.get(nlp_value_seed_1.NlpValueSeeder);
    const existingUsers = await userSeeder.findAll();
    if (existingUsers.length > 0) {
        logger.log('Database already seeded, aborting ...');
        return;
    }
    try {
        await modelSeeder.seed(model_seed_model_1.modelModels);
    }
    catch (e) {
        logger.error('Unable to seed the database with models!');
        throw e;
    }
    try {
        await roleSeeder.seed(role_seed_model_1.roleModels);
    }
    catch (e) {
        logger.error('Unable to seed the database with roles!');
        throw e;
    }
    const models = await modelSeeder.findAll();
    const roles = await roleSeeder.findAll();
    const adminRole = roles.find(({ name }) => name === 'admin');
    const managerRole = roles.find(({ name }) => name === 'manager');
    const managerModels = models.filter((model) => !['Role', 'User', 'Permission'].includes(model.name));
    const roleModelsCombinations = [
        ...models.map((model) => [model.id, adminRole.id]),
        ...managerModels.map((model) => [model.id, managerRole.id]),
    ];
    const permissionSeeds = roleModelsCombinations.reduce((acc, [modelId, roleId]) => {
        return acc.concat((0, permission_seed_model_1.permissionModels)(modelId, roleId));
    }, []);
    try {
        await permissionSeeder.seed(permissionSeeds);
    }
    catch (e) {
        logger.error('Unable to seed the database with permissions!');
        throw e;
    }
    if (adminRole) {
        try {
            await userSeeder.seed((0, user_seed_model_1.userModels)([adminRole.id]));
        }
        catch (e) {
            logger.error('Unable to seed the database with users!');
            throw e;
        }
    }
    try {
        await settingSeeder.seed(setting_seed_model_1.DEFAULT_SETTINGS);
        await metadataSeeder.seed(metadata_seed_model_1.DEFAULT_METADATA);
    }
    catch (e) {
        logger.error('Unable to seed the database with settings and metadata!');
        throw e;
    }
    try {
        await categorySeeder.seed(category_seed_model_1.categoryModels);
    }
    catch (e) {
        logger.error('Unable to seed the database with categories!');
        throw e;
    }
    try {
        await contextVarSeeder.seed(context_var_seed_model_1.contextVarModels);
    }
    catch (e) {
        logger.error('Unable to seed the database with context vars!');
        throw e;
    }
    try {
        await languageSeeder.seed(language_seed_model_1.languageModels);
    }
    catch (e) {
        logger.error('Unable to seed the database with languages!');
        throw e;
    }
    try {
        await translationSeeder.seed(translation_seed_model_1.translationModels);
    }
    catch (e) {
        logger.error('Unable to seed the database with translations!');
        throw e;
    }
    try {
        await nlpEntitySeeder.seed(nlp_entity_seed_model_1.nlpEntityModels);
        await nlpValueSeeder.seed(nlp_value_seed_model_1.nlpValueModels);
    }
    catch (e) {
        logger.error('Unable to seed the database with nlp entities!');
        throw e;
    }
}
exports.seedDatabase = seedDatabase;
//# sourceMappingURL=seeder.js.map