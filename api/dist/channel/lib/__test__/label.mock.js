"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerLabelsMock = exports.labelMock = void 0;
const base_mock_1 = require("./base.mock");
const baseLabel = {
    ...base_mock_1.modelInstance,
    title: '',
    name: '',
    label_id: {
        messenger: '',
        web: '',
        dimelo: '',
        twitter: '',
    },
    description: '',
    builtin: false,
};
exports.labelMock = {
    ...baseLabel,
    title: 'Label',
    name: 'label',
    label_id: {
        messenger: 'none',
        web: 'none',
        dimelo: 'none',
        twitter: 'none',
    },
};
exports.customerLabelsMock = [
    {
        ...baseLabel,
        title: 'Client',
        name: 'client',
        label_id: {
            messenger: 'none',
            web: 'none',
            dimelo: 'none',
            twitter: 'none',
        },
    },
    {
        ...baseLabel,
        title: 'Professional',
        name: 'profressional',
        label_id: {
            messenger: 'none',
            web: 'none',
            dimelo: 'none',
            twitter: 'none',
        },
    },
];
//# sourceMappingURL=label.mock.js.map