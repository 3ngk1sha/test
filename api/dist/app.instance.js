"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppInstance = void 0;
class AppInstance {
    static setApp(app) {
        this.app = app;
    }
    static getApp() {
        if (!this.app) {
            throw new Error('App instance has not been set yet.');
        }
        return this.app;
    }
}
exports.AppInstance = AppInstance;
//# sourceMappingURL=app.instance.js.map