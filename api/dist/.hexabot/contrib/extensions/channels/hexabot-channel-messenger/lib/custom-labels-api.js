"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLabelsAPI = void 0;
class CustomLabelsAPI {
    constructor(graphRequest) {
        this.graphRequest = graphRequest;
    }
    async createCustomLabel(name) {
        if (!name) {
            throw new Error('name required');
        }
        const options = {
            payload: { name },
        };
        const response = await this.callCustomLabelsApi(options);
        return response;
    }
    async getCustomLabelById(label_id) {
        if (!label_id) {
            throw new Error('label_id required');
        }
        const options = {
            path: '/' + label_id,
            qs: { fields: 'id,name' },
        };
        const response = await this.callCustomLabelsApi(options);
        return response;
    }
    async deleteCustomLabel(label_id) {
        if (!label_id) {
            throw new Error('label_id required');
        }
        const options = {
            method: 'DELETE',
            path: '/' + label_id,
        };
        const response = await this.callCustomLabelsApi(options);
        return response;
    }
    async addPsidtoCustomLabel(psid, label_id) {
        if (!psid || !label_id) {
            throw new Error('PSID and label_id required');
        }
        const options = {
            path: `/${label_id}/label`,
            payload: { user: psid },
        };
        const response = await this.callCustomLabelsApi(options);
        return response;
    }
    async removePsidfromCustomLabel(psid, label_id) {
        if (!psid || !label_id) {
            throw new Error('PSID and label_id required');
        }
        const options = {
            method: 'DELETE',
            path: `/${label_id}/label`,
            payload: { user: psid },
        };
        const response = await this.callCustomLabelsApi(options);
        return response;
    }
    async callCustomLabelsApi(options) {
        options.apiVersion = 'v2.11';
        if (!options.path) {
            options.path = '/me/custom_labels';
        }
        return this.graphRequest.sendRequest(options);
    }
}
exports.CustomLabelsAPI = CustomLabelsAPI;
//# sourceMappingURL=custom-labels-api.js.map