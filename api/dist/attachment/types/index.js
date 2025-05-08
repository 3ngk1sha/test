"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentFile = exports.AttachmentAccess = exports.AttachmentResourceRef = exports.AttachmentCreatedByRef = void 0;
var AttachmentCreatedByRef;
(function (AttachmentCreatedByRef) {
    AttachmentCreatedByRef["User"] = "User";
    AttachmentCreatedByRef["Subscriber"] = "Subscriber";
})(AttachmentCreatedByRef || (exports.AttachmentCreatedByRef = AttachmentCreatedByRef = {}));
var AttachmentResourceRef;
(function (AttachmentResourceRef) {
    AttachmentResourceRef["SettingAttachment"] = "Setting";
    AttachmentResourceRef["UserAvatar"] = "User";
    AttachmentResourceRef["SubscriberAvatar"] = "Subscriber";
    AttachmentResourceRef["BlockAttachment"] = "Block";
    AttachmentResourceRef["ContentAttachment"] = "Content";
    AttachmentResourceRef["MessageAttachment"] = "Message";
})(AttachmentResourceRef || (exports.AttachmentResourceRef = AttachmentResourceRef = {}));
var AttachmentAccess;
(function (AttachmentAccess) {
    AttachmentAccess["Public"] = "public";
    AttachmentAccess["Private"] = "private";
})(AttachmentAccess || (exports.AttachmentAccess = AttachmentAccess = {}));
class AttachmentFile {
}
exports.AttachmentFile = AttachmentFile;
//# sourceMappingURL=index.js.map