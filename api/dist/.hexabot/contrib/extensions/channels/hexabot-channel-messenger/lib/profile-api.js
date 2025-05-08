"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileAPI = void 0;
class ProfileAPI {
    constructor(graphRequest) {
        this.graphRequest = graphRequest;
        this.graphRequest = graphRequest;
    }
    async setMessengerProfile(fields) {
        if (!fields || typeof fields !== 'object') {
            throw new Error('Valid fields object required');
        }
        return await this.call(fields);
    }
    async deleteMessengerProfile(fields) {
        if (!fields || !Array.isArray(fields)) {
            throw new Error('Valid fields array required');
        }
        return this.call({ fields });
    }
    async getUserProfile(psid, userFields) {
        return (await this.call(userFields, `/${psid}`));
    }
    async call(profile, path) {
        const options = {
            path: path || '/me/messenger_profile',
        };
        if (typeof profile === 'string') {
            options.qs = { fields: profile };
        }
        else if (typeof profile === 'object') {
            options.payload = profile;
            if ('fields' in profile && profile.fields) {
                options.method = 'DELETE';
            }
        }
        return await this.graphRequest.sendRequest(options);
    }
}
exports.ProfileAPI = ProfileAPI;
//# sourceMappingURL=profile-api.js.map