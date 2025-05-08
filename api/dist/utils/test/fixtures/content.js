"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installContentFixtures = exports.contentFixtures = exports.contentDefaultValues = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const content_schema_1 = require("../../../cms/schemas/content.schema");
const defaultValues_1 = require("../defaultValues");
const attachment_1 = require("./attachment");
const contenttype_1 = require("./contenttype");
exports.contentDefaultValues = {
    status: true,
};
const contents = [
    {
        title: 'Jean',
        dynamicFields: {
            subtitle: 'Jean Droit Taille Normale',
            image: {
                payload: {
                    url: 'https://images-na.ssl-images-amazon.com/images/I/31DY09uzLDL._SX38_SY50_CR,0,0,38,50_.jpg',
                },
            },
        },
        entity: '0',
    },
    {
        title: 'Adaptateur',
        dynamicFields: {
            subtitle: 'Rankie Adaptateur DisplayPort vers VGA, 1080P Full HD, Noir',
            image: {
                payload: {
                    url: 'https://images-eu.ssl-images-amazon.com/images/I/41mUnrSGKwL._SL75_.jpg',
                },
            },
        },
        entity: '0',
        status: false,
    },
    {
        title: 'Sac a Main Femmes Cuir',
        dynamicFields: {
            subtitle: 'BestoU Sac a Main Femmes Cuir Bandoulieres Grand Sacs Porte Cabas (Marron)',
            image: {
                payload: {
                    url: 'https://images-na.ssl-images-amazon.com/images/I/51AV-LVMMEL._SS36_.jpg',
                },
            },
        },
        entity: '0',
    },
    {
        title: 'Kitten Heel',
        dynamicFields: {
            subtitle: 'Kitten Heel Sling Back',
            image: {
                payload: {
                    url: 'https://images-na.ssl-images-amazon.com/images/I/31qzy-FAE5L._SS47_.jpg',
                },
            },
        },
        entity: '0',
    },
    {
        title: 'A Collection of Nameless',
        dynamicFields: {
            subtitle: 'Scenarios - A Collection of Nameless Detective Stories (English Edition)',
            image: {
                payload: {
                    url: 'https://images-na.ssl-images-amazon.com/images/I/31qzy-FAE5L._SS47_.jpg',
                },
            },
        },
        entity: '0',
    },
    {
        title: 'Pizza Hut',
        dynamicFields: {
            address: '90،, Avenue Taher Ben Ammar, Tunis',
            image: {
                payload: {
                    url: 'https://www.google.com/maps/uv?hl=fr&pb=!1s0x12fd336848aa1b4d:0xeccb5887cef91140!3m1!7e115!4shttps://lh5.googleusercontent.com/p/AF1QipNEPe0sTSH08WF57AXb1YfmFCDFJPKCUwW0Ervn%3Dw260-h175-n-k-no!5spizza+hut+address+-+Recherche+Google&imagekey=!1e10!2sAF1QipNEPe0sTSH08WF57AXb1YfmFCDFJPKCUwW0Ervn',
                },
            },
        },
        entity: '1',
    },
    {
        title: 'store 1',
        dynamicFields: {
            image: {
                type: 'image',
                payload: {
                    id: null,
                },
            },
        },
        entity: '2',
    },
    {
        title: 'store 2',
        dynamicFields: {
            image: {
                type: 'image',
                payload: {
                    id: null,
                },
            },
        },
        entity: '2',
    },
    {
        title: 'store 3',
        dynamicFields: {
            image: {
                type: 'image',
                payload: {
                    url: 'https://remote.file/image.jpg',
                },
            },
        },
        entity: '2',
    },
];
exports.contentFixtures = (0, defaultValues_1.getFixturesWithDefaultValues)({
    fixtures: contents,
    defaultValues: exports.contentDefaultValues,
});
const installContentFixtures = async () => {
    const attachments = await (0, attachment_1.installAttachmentFixtures)();
    const contentTypes = await (0, contenttype_1.installContentTypeFixtures)();
    const Content = mongoose_1.default.model(content_schema_1.ContentModel.name, content_schema_1.ContentModel.schema);
    return await Content.insertMany(exports.contentFixtures.map((contentFixture) => {
        const attachment = attachments.find(({ name }) => name === `${contentFixture.title.replace(' ', '')}.jpg`);
        if (attachment) {
            contentFixture.dynamicFields.image.payload.id = attachment.id;
        }
        return {
            ...contentFixture,
            entity: contentTypes[parseInt(contentFixture.entity)].id,
        };
    }));
};
exports.installContentFixtures = installContentFixtures;
//# sourceMappingURL=content.js.map