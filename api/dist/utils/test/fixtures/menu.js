"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installMenuFixtures = exports.accountMenuFixtures = exports.devicesMenuFixtures = exports.offersMenuFixtures = exports.rootMenuFixtures = exports.offerMenuFixture = exports.websiteMenuFixture = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const menu_schema_1 = require("../../../cms/schemas/menu.schema");
const menu_1 = require("../../../cms/schemas/types/menu");
exports.websiteMenuFixture = {
    type: menu_1.MenuType.web_url,
    url: 'https://orange.tn',
    title: 'Site Web',
};
exports.offerMenuFixture = {
    title: 'Nos Offres et Nos Boutiques',
    type: menu_1.MenuType.nested,
};
exports.rootMenuFixtures = [
    exports.offerMenuFixture,
    {
        type: menu_1.MenuType.nested,
        title: 'Gérer Mon Compte',
    },
    exports.websiteMenuFixture,
];
exports.offersMenuFixtures = [
    {
        parent: '0',
        type: menu_1.MenuType.postback,
        payload: 'Lignes mobiles',
        title: 'Offres mobiles',
    },
    {
        parent: '0',
        type: menu_1.MenuType.nested,
        title: 'Devices',
    },
    {
        parent: '0',
        title: 'Points de Ventes et Boutiques',
        type: menu_1.MenuType.postback,
        payload: 'Points de Ventes et Boutiques',
    },
];
exports.devicesMenuFixtures = [
    {
        parent: '4',
        type: menu_1.MenuType.postback,
        payload: 'Smartphones',
        title: 'Smartphones',
    },
    {
        parent: '4',
        title: 'Tablettes',
        type: menu_1.MenuType.postback,
        payload: 'Tablettes',
    },
    {
        parent: '4',
        title: 'Accessoires',
        type: menu_1.MenuType.postback,
        payload: 'Accessoires',
    },
];
exports.accountMenuFixtures = [
    {
        parent: '1',
        type: menu_1.MenuType.postback,
        payload: 'Consultation de solde',
        title: 'Consultation de solde',
    },
    {
        parent: '1',
        type: menu_1.MenuType.postback,
        payload: "Achat d'options",
        title: "Achat d'options",
    },
    {
        parent: '1',
        title: 'Mon offre',
        type: menu_1.MenuType.postback,
        payload: 'Mon offre',
    },
    {
        parent: '1',
        title: 'Obtenir mon code PUK',
        type: menu_1.MenuType.postback,
        payload: 'Obtenir mon code PUK',
    },
];
const installMenuFixtures = async () => {
    const Menu = mongoose_1.default.model(menu_schema_1.MenuModel.name, menu_schema_1.MenuModel.schema);
    const docs = await Menu.insertMany(exports.rootMenuFixtures);
    const offerDocs = await Menu.insertMany(exports.offersMenuFixtures.map((m) => ({
        ...m,
        parent: m.parent ? docs[parseInt(m.parent)].id : undefined,
    })));
    const allDocs = docs.concat(offerDocs);
    await Menu.insertMany(exports.devicesMenuFixtures.map((m) => ({
        ...m,
        parent: m.parent ? allDocs[parseInt(m.parent)].id : undefined,
    })));
    return await Menu.insertMany(exports.accountMenuFixtures.map((m) => {
        return {
            ...m,
            parent: m.parent ? docs[parseInt(m.parent)].id : undefined,
        };
    }));
};
exports.installMenuFixtures = installMenuFixtures;
//# sourceMappingURL=menu.js.map