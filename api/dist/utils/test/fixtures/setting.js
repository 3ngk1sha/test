"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installSettingFixtures = exports.settingFixtures = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const setting_schema_1 = require("../../../setting/schemas/setting.schema");
const types_1 = require("../../../setting/schemas/types");
const safeRandom_1 = require("../../helpers/safeRandom");
exports.settingFixtures = [
    {
        group: 'chatbot_settings',
        label: 'default_storage_helper',
        value: 'local-storage-helper',
        type: types_1.SettingType.text,
        weight: 1,
    },
    {
        group: 'contact',
        label: 'contact_email_recipient',
        value: 'admin@example.com',
        type: types_1.SettingType.text,
        weight: 1,
    },
    {
        group: 'contact',
        label: 'company_name',
        value: 'Your company name',
        type: types_1.SettingType.text,
        weight: 2,
    },
    {
        group: 'contact',
        label: 'company_phone',
        value: '(+999) 9999 9999 999',
        type: types_1.SettingType.text,
        weight: 3,
    },
    {
        group: 'contact',
        label: 'company_email',
        value: 'contact[at]mycompany.com',
        type: types_1.SettingType.text,
        weight: 4,
    },
    {
        group: 'contact',
        label: 'company_address1',
        value: '71 Pilgrim Avenue',
        type: types_1.SettingType.text,
        weight: 5,
    },
    {
        group: 'contact',
        label: 'company_address2',
        value: '',
        type: types_1.SettingType.text,
        weight: 6,
    },
    {
        group: 'contact',
        label: 'company_city',
        value: 'Chevy Chase',
        type: types_1.SettingType.text,
        weight: 7,
    },
    {
        group: 'contact',
        label: 'company_zipcode',
        value: '85705',
        type: types_1.SettingType.text,
        weight: 8,
    },
    {
        group: 'contact',
        label: 'company_state',
        value: 'Orlando',
        type: types_1.SettingType.text,
        weight: 9,
    },
    {
        group: 'contact',
        label: 'company_country',
        value: 'US',
        type: types_1.SettingType.text,
        weight: 10,
    },
    {
        group: `${(0, safeRandom_1.getRandom)()}_channel`,
        label: `${(0, safeRandom_1.getRandom)()}`,
        value: '',
        type: types_1.SettingType.text,
        weight: 11,
    },
    {
        group: `${(0, safeRandom_1.getRandom)()}_helper`,
        label: `${(0, safeRandom_1.getRandom)()}`,
        value: '',
        type: types_1.SettingType.text,
        weight: 12,
    },
    {
        group: `${(0, safeRandom_1.getRandom)()}_channel`,
        label: `${(0, safeRandom_1.getRandom)()}`,
        value: '',
        type: types_1.SettingType.text,
        weight: 13,
    },
    {
        group: `${(0, safeRandom_1.getRandom)()}_helper`,
        label: `${(0, safeRandom_1.getRandom)()}`,
        value: '',
        type: types_1.SettingType.text,
        weight: 14,
    },
    {
        group: 'local_storage_helper',
        label: 'default storage helper label',
        value: 'local-storage-helper',
        type: types_1.SettingType.text,
        weight: 15,
    },
];
const installSettingFixtures = async () => {
    const Setting = mongoose_1.default.model(setting_schema_1.SettingModel.name, setting_schema_1.SettingModel.schema);
    return await Setting.insertMany(exports.settingFixtures);
};
exports.installSettingFixtures = installSettingFixtures;
//# sourceMappingURL=setting.js.map