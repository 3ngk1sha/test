"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphApi = void 0;
const fs = __importStar(require("fs"));
const form_data_1 = __importDefault(require("form-data"));
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const custom_labels_api_1 = require("./custom-labels-api");
const profile_api_1 = require("./profile-api");
const send_api_1 = __importDefault(require("./send-api"));
function formatApiVersion(version) {
    if (!version) {
        return;
    }
    if (typeof version !== 'string' || version.indexOf('v') !== 0) {
        return 'v' + version;
    }
    return version;
}
class GraphApi {
    constructor(httpService, pageToken) {
        this.httpService = httpService;
        this.pageToken = pageToken;
        this.graphApiVersion = 'v3.0';
        this.send = new send_api_1.default(this);
        this.profile = new profile_api_1.ProfileAPI(this);
        this.customLabels = new custom_labels_api_1.CustomLabelsAPI(this);
    }
    setApiVersion(version) {
        this.graphApiVersion = formatApiVersion(version) || '';
        return this.graphApiVersion;
    }
    getApiVersion() {
        return this.graphApiVersion;
    }
    async sendRequest(options) {
        const apiVersion = options.apiVersion || this.getApiVersion();
        const qs = options.qs || {};
        let uri = 'https://graph.facebook.com';
        if (!options.path) {
            throw new Error('Valid "path" property required');
        }
        if (!qs.access_token) {
            const pageToken = this.pageToken;
            if (!pageToken) {
                throw new Error('Page token is not set');
            }
            qs.access_token = pageToken;
        }
        if (apiVersion) {
            uri += `/${apiVersion}`;
        }
        uri += `${options.path}`;
        let method;
        if (options.method) {
            method = options.method.toUpperCase();
        }
        else if (options.payload || options.formData) {
            method = 'POST';
        }
        else {
            method = 'GET';
        }
        const axiosConfig = {
            url: uri,
            method: method,
            params: qs,
            responseType: 'json',
        };
        if (options.payload) {
            if (typeof options.payload !== 'object') {
                throw new Error('Invalid request payload');
            }
            axiosConfig.data = options.payload;
        }
        if (options.formData) {
            if (typeof options.formData !== 'object') {
                throw new Error('Invalid formData');
            }
            const formData = new form_data_1.default();
            for (const data in options.formData) {
                if (options.formData.hasOwnProperty(data)) {
                    let value = options.formData[data];
                    if (typeof value !== 'string' && !(value instanceof fs.ReadStream)) {
                        value = JSON.stringify(value);
                    }
                    if (data === 'filedata' && typeof value === 'string') {
                        value = fs.createReadStream(value);
                    }
                    formData.append(data, value);
                }
            }
            axiosConfig.data = formData;
            axiosConfig.headers = {
                ...axiosConfig.headers,
                ...formData.getHeaders(),
            };
        }
        return await (0, rxjs_1.lastValueFrom)(this.httpService.request(axiosConfig).pipe((0, operators_1.map)((response) => response.data), (0, operators_1.catchError)((error) => {
            if (error.response && error.response.data) {
                return (0, rxjs_1.throwError)(() => error.response.data);
            }
            return (0, rxjs_1.throwError)(() => error);
        })));
    }
}
exports.GraphApi = GraphApi;
//# sourceMappingURL=graph-api.js.map