"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBotAvatar = exports.generateInitialsAvatar = exports.generateAvatarSvg = void 0;
const path_1 = __importDefault(require("path"));
const common_1 = require("@nestjs/common");
const resvg_js_1 = require("@resvg/resvg-js");
const misc_1 = require("./misc");
const svg_1 = require("./svg");
const generateAvatarSvg = async (svg) => {
    const resvg = new resvg_js_1.Resvg(svg, {
        fitTo: { mode: 'height', value: 50 },
        textRendering: 1,
        font: {
            fontFiles: [path_1.default.join(process.cwd(), 'assets/Roboto-Regular.ttf')],
        },
    });
    const renderedSvg = resvg.render();
    const renderedImage = renderedSvg.asPng();
    return new common_1.StreamableFile(renderedImage);
};
exports.generateAvatarSvg = generateAvatarSvg;
const generateInitialsAvatar = async (name) => {
    const svg = (0, svg_1.generateUIAvatarSvg)({
        text: getInitials(name),
        bgColor: '#DBDBDB',
    });
    return await (0, exports.generateAvatarSvg)(svg);
};
exports.generateInitialsAvatar = generateInitialsAvatar;
const getBotAvatar = async (color) => {
    const svg = (0, svg_1.generateBotAvatarSvg)({ bgColor: color });
    return await (0, exports.generateAvatarSvg)(svg);
};
exports.getBotAvatar = getBotAvatar;
const getInitials = (name) => {
    if ((0, misc_1.isEmpty)(name.first_name)) {
        const string = name.first_name.trim().slice(0, 2);
        return string.toUpperCase();
    }
    if ((0, misc_1.isEmpty)(name.last_name)) {
        const string = name.last_name.trim().slice(0, 2);
        return string.toUpperCase();
    }
    return `${name.first_name.trim()[0]}${name.last_name.trim()[0]}`.toUpperCase();
};
//# sourceMappingURL=avatar.js.map