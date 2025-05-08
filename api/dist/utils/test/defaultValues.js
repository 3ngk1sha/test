"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFixturesWithDefaultValues = void 0;
const date_1 = require("./date");
const getFixturesWithDefaultValues = ({ fixtures, defaultValues = {}, }) => fixtures.map((fixture, index) => ({
    ...defaultValues,
    ...fixture,
    createdAt: defaultValues.hasOwnProperty('createdAt')
        ? defaultValues.createdAt
        : (0, date_1.getDelayedDate)(index),
}));
exports.getFixturesWithDefaultValues = getFixturesWithDefaultValues;
//# sourceMappingURL=defaultValues.js.map