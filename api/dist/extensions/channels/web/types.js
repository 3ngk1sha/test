"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web = void 0;
var Web;
(function (Web) {
    let StatusEventType;
    (function (StatusEventType) {
        StatusEventType["delivery"] = "delivery";
        StatusEventType["read"] = "read";
        StatusEventType["typing"] = "typing";
    })(StatusEventType = Web.StatusEventType || (Web.StatusEventType = {}));
    let IncomingMessageType;
    (function (IncomingMessageType) {
        IncomingMessageType["text"] = "text";
        IncomingMessageType["quick_reply"] = "quick_reply";
        IncomingMessageType["postback"] = "postback";
        IncomingMessageType["location"] = "location";
        IncomingMessageType["file"] = "file";
    })(IncomingMessageType = Web.IncomingMessageType || (Web.IncomingMessageType = {}));
    let OutgoingMessageType;
    (function (OutgoingMessageType) {
        OutgoingMessageType["text"] = "text";
        OutgoingMessageType["buttons"] = "buttons";
        OutgoingMessageType["quick_replies"] = "quick_replies";
        OutgoingMessageType["file"] = "file";
        OutgoingMessageType["list"] = "list";
        OutgoingMessageType["carousel"] = "carousel";
    })(OutgoingMessageType = Web.OutgoingMessageType || (Web.OutgoingMessageType = {}));
})(Web || (exports.Web = Web = {}));
//# sourceMappingURL=types.js.map