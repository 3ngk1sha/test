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
const fs_1 = require("fs");
const path_1 = require("path");
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const attachment_schema_1 = __importStar(require("../../attachment/schemas/attachment.schema"));
const types_1 = require("../../attachment/types");
const block_schema_1 = __importStar(require("../../chat/schemas/block.schema"));
const message_schema_1 = __importStar(require("../../chat/schemas/message.schema"));
const subscriber_schema_1 = __importStar(require("../../chat/schemas/subscriber.schema"));
const content_schema_1 = __importStar(require("../../cms/schemas/content.schema"));
const config_1 = require("../../config");
const setting_schema_1 = __importStar(require("../../setting/schemas/setting.schema"));
const types_2 = require("../../setting/schemas/types");
const role_schema_1 = __importStar(require("../../user/schemas/role.schema"));
const user_schema_1 = __importStar(require("../../user/schemas/user.schema"));
const fs_2 = require("../../utils/helpers/fs");
const types_3 = require("../types");
const getAdminUser = async () => {
    const RoleModel = mongoose_1.default.model(role_schema_1.Role.name, role_schema_1.default);
    const UserModel = mongoose_1.default.model(user_schema_1.User.name, user_schema_1.default);
    const adminRole = await RoleModel.findOne({ name: 'admin' });
    const user = await UserModel.findOne({ roles: [adminRole._id] }).sort({
        createdAt: 'asc',
    });
    return user;
};
const populateBlockAttachments = async ({ logger }) => {
    const AttachmentModel = mongoose_1.default.model(attachment_schema_1.Attachment.name, attachment_schema_1.default);
    const BlockModel = mongoose_1.default.model(block_schema_1.Block.name, block_schema_1.default);
    const user = await getAdminUser();
    if (!user) {
        logger.warn('Unable to process block attachments, no admin user found');
        return;
    }
    const cursor = BlockModel.find({
        'message.attachment': { $exists: true },
    }).cursor();
    for await (const block of cursor) {
        try {
            const msgPayload = block.message
                .attachment.payload;
            if (msgPayload && 'id' in msgPayload && msgPayload.id) {
                const attachmentId = msgPayload.id;
                await AttachmentModel.updateOne({ _id: attachmentId }, {
                    $set: {
                        resourceRef: types_1.AttachmentResourceRef.BlockAttachment,
                        access: 'public',
                        createdByRef: types_1.AttachmentCreatedByRef.User,
                        createdBy: user._id,
                    },
                });
                logger.log(`Attachment ${attachmentId} attributes successfully updated for block ${block._id}`);
            }
            else {
                logger.warn(`Block ${block._id} has a "message.attachment" but no "id" found`);
            }
        }
        catch (error) {
            logger.error(`Failed to update attachment for block ${block._id}: ${error.message}`);
        }
    }
};
const populateSettingAttachments = async ({ logger }) => {
    const AttachmentModel = mongoose_1.default.model(attachment_schema_1.Attachment.name, attachment_schema_1.default);
    const SettingModel = mongoose_1.default.model(setting_schema_1.Setting.name, setting_schema_1.default);
    const user = await getAdminUser();
    if (!user) {
        logger.warn('Unable to populate setting attachments, no admin user found');
    }
    const cursor = SettingModel.find({
        type: types_2.SettingType.attachment,
    }).cursor();
    for await (const setting of cursor) {
        try {
            if (setting.value) {
                await AttachmentModel.updateOne({ _id: setting.value }, {
                    $set: {
                        resourceRef: types_1.AttachmentResourceRef.SettingAttachment,
                        access: 'public',
                        createdByRef: types_1.AttachmentCreatedByRef.User,
                        createdBy: user._id,
                    },
                });
                logger.log(`User ${user._id} avatar attributes successfully populated`);
            }
        }
        catch (error) {
            logger.error(`Failed to populate avatar attributes for user ${user._id}: ${error.message}`);
        }
    }
};
const populateUserAvatars = async ({ logger }) => {
    const AttachmentModel = mongoose_1.default.model(attachment_schema_1.Attachment.name, attachment_schema_1.default);
    const UserModel = mongoose_1.default.model(user_schema_1.User.name, user_schema_1.default);
    const cursor = UserModel.find({
        avatar: { $exists: true, $ne: null },
    }).cursor();
    for await (const user of cursor) {
        try {
            await AttachmentModel.updateOne({ _id: user.avatar }, {
                $set: {
                    resourceRef: types_1.AttachmentResourceRef.UserAvatar,
                    access: 'private',
                    createdByRef: types_1.AttachmentCreatedByRef.User,
                    createdBy: user._id,
                },
            });
            logger.log(`User ${user._id} avatar attributes successfully populated`);
        }
        catch (error) {
            logger.error(`Failed to populate avatar attributes for user ${user._id}: ${error.message}`);
        }
    }
};
const populateSubscriberAvatars = async ({ logger }) => {
    const AttachmentModel = mongoose_1.default.model(attachment_schema_1.Attachment.name, attachment_schema_1.default);
    const SubscriberModel = mongoose_1.default.model(subscriber_schema_1.Subscriber.name, subscriber_schema_1.default);
    const cursor = SubscriberModel.find().cursor();
    for await (const subscriber of cursor) {
        try {
            const foreignId = subscriber.foreign_id;
            if (!foreignId) {
                logger.debug(`No foreign id found for subscriber ${subscriber._id}`);
                continue;
            }
            const attachment = await AttachmentModel.findOne({
                name: RegExp(`^${foreignId}.jpe?g$`),
            });
            if (attachment) {
                await SubscriberModel.updateOne({ _id: subscriber._id }, {
                    $set: {
                        avatar: attachment._id,
                    },
                });
                logger.log(`Subscriber ${subscriber._id} avatar attribute successfully updated`);
                await AttachmentModel.updateOne({ _id: attachment._id }, {
                    $set: {
                        resourceRef: types_1.AttachmentResourceRef.SubscriberAvatar,
                        access: 'private',
                        createdByRef: types_1.AttachmentCreatedByRef.Subscriber,
                        createdBy: subscriber._id,
                    },
                });
                logger.log(`Subscriber ${subscriber._id} avatar attachment attributes successfully populated`);
                const src = (0, path_1.resolve)((0, path_1.join)(config_1.config.parameters.uploadDir, attachment.location));
                if ((0, fs_1.existsSync)(src)) {
                    try {
                        const dst = (0, path_1.resolve)((0, path_1.join)(config_1.config.parameters.avatarDir, attachment.location));
                        await (0, fs_2.moveFile)(src, dst);
                        logger.log(`Subscriber ${subscriber._id} avatar file successfully moved to the new "avatars" folder`);
                    }
                    catch (err) {
                        logger.error(err);
                        logger.warn(`Unable to move subscriber ${subscriber._id} avatar!`);
                    }
                }
                else {
                    logger.warn(`Subscriber ${subscriber._id} avatar attachment file was not found!`);
                }
            }
            else {
                logger.warn(`No avatar attachment found for subscriber ${subscriber._id}`);
            }
        }
        catch (err) {
            logger.error(err);
            logger.error(`Unable to populate subscriber avatar ${subscriber._id}`);
        }
    }
};
const unpopulateSubscriberAvatar = async ({ logger }) => {
    const AttachmentModel = mongoose_1.default.model(attachment_schema_1.Attachment.name, attachment_schema_1.default);
    const SubscriberModel = mongoose_1.default.model(subscriber_schema_1.Subscriber.name, subscriber_schema_1.default);
    const cursor = SubscriberModel.find({ avatar: { $exists: true } }).cursor();
    for await (const subscriber of cursor) {
        try {
            if (subscriber.avatar) {
                const attachment = await AttachmentModel.findOne({
                    _id: subscriber.avatar,
                });
                if (attachment) {
                    const src = (0, path_1.resolve)((0, path_1.join)(config_1.config.parameters.avatarDir, attachment.location));
                    if ((0, fs_1.existsSync)(src)) {
                        try {
                            const dst = (0, path_1.resolve)((0, path_1.join)(config_1.config.parameters.uploadDir, attachment.location));
                            await (0, fs_2.moveFile)(src, dst);
                            logger.log(`Avatar attachment successfully moved back to the old "avatars" folder`);
                        }
                        catch (err) {
                            logger.error(err);
                            logger.warn(`Unable to move back subscriber ${subscriber._id} avatar to the old folder!`);
                        }
                    }
                    else {
                        logger.warn('Avatar attachment file was not found!');
                    }
                    await SubscriberModel.updateOne({ _id: subscriber._id }, {
                        $set: { avatar: null },
                    });
                    logger.log(`Subscriber ${subscriber._id} avatar attribute successfully reverted to null`);
                }
                else {
                    logger.warn(`No avatar attachment found for subscriber ${subscriber._id}`);
                }
            }
        }
        catch (err) {
            logger.error(err);
            logger.error(`Unable to unpopulate subscriber ${subscriber._id} avatar`);
        }
    }
};
const undoPopulateAttachments = async ({ logger }) => {
    const AttachmentModel = mongoose_1.default.model(attachment_schema_1.Attachment.name, attachment_schema_1.default);
    try {
        const result = await AttachmentModel.updateMany({
            resourceRef: {
                $in: [
                    types_1.AttachmentResourceRef.BlockAttachment,
                    types_1.AttachmentResourceRef.SettingAttachment,
                    types_1.AttachmentResourceRef.UserAvatar,
                    types_1.AttachmentResourceRef.SubscriberAvatar,
                    types_1.AttachmentResourceRef.ContentAttachment,
                    types_1.AttachmentResourceRef.MessageAttachment,
                ],
            },
        }, {
            $unset: {
                resourceRef: '',
                access: '',
                createdByRef: '',
                createdBy: '',
            },
        });
        logger.log(`Successfully reverted attributes for ${result.modifiedCount} attachments with ref AttachmentResourceRef.SettingAttachment`);
    }
    catch (error) {
        logger.error(`Failed to revert attributes for attachments with ref AttachmentResourceRef.SettingAttachment: ${error.message}`);
    }
};
const updateOldAvatarsPath = async ({ logger }) => {
    const oldPath = (0, path_1.join)(process.cwd(), process.env.AVATAR_DIR || '/avatars');
    if ((0, fs_1.existsSync)(oldPath)) {
        logger.verbose(`Moving subscriber avatar files from ${oldPath} to ${config_1.config.parameters.avatarDir} ...`);
        try {
            await (0, fs_2.moveFiles)(oldPath, config_1.config.parameters.avatarDir);
            logger.log('Avatars folder successfully moved to its new location ...');
        }
        catch (err) {
            logger.error(err);
            logger.error('Unable to move files from the old "avatars" folder');
        }
    }
    else {
        logger.log(`No old avatars folder found: ${oldPath}`);
    }
    const AttachmentModel = mongoose_1.default.model(attachment_schema_1.Attachment.name, attachment_schema_1.default);
    const UserModel = mongoose_1.default.model(user_schema_1.User.name, user_schema_1.default);
    const cursor = UserModel.find().cursor();
    for await (const user of cursor) {
        try {
            if (user.avatar) {
                const avatar = await AttachmentModel.findOne({ _id: user.avatar });
                if (avatar) {
                    const src = (0, path_1.resolve)((0, path_1.join)(config_1.config.parameters.uploadDir, avatar.location));
                    const dst = (0, path_1.resolve)((0, path_1.join)(config_1.config.parameters.avatarDir, avatar.location));
                    logger.verbose(`Moving user avatar file from ${src} to ${dst} ...`);
                    await (0, fs_2.moveFile)(src, dst);
                }
            }
        }
        catch (err) {
            logger.error(err);
            logger.error('Unable to move user avatar to the new folder');
        }
    }
};
const restoreOldAvatarsPath = async ({ logger }) => {
    const AttachmentModel = mongoose_1.default.model(attachment_schema_1.Attachment.name, attachment_schema_1.default);
    const UserModel = mongoose_1.default.model(user_schema_1.User.name, user_schema_1.default);
    const cursor = UserModel.find().cursor();
    for await (const user of cursor) {
        try {
            if (user.avatar) {
                const avatar = await AttachmentModel.findOne({ _id: user.avatar });
                if (avatar) {
                    const src = (0, path_1.resolve)((0, path_1.join)(config_1.config.parameters.avatarDir, avatar.location));
                    const dst = (0, path_1.resolve)((0, path_1.join)(config_1.config.parameters.uploadDir, avatar.location));
                    logger.verbose(`Moving user avatar file from ${src} to ${dst} ...`);
                    await (0, fs_2.moveFile)(src, dst);
                }
            }
        }
        catch (err) {
            logger.error(err);
            logger.error('Unable to move user avatar to the new folder');
        }
    }
    const oldPath = (0, path_1.resolve)((0, path_1.join)(process.cwd(), process.env.AVATAR_DIR || '/avatars'));
    if ((0, fs_1.existsSync)(config_1.config.parameters.avatarDir)) {
        try {
            await (0, fs_2.moveFiles)(config_1.config.parameters.avatarDir, oldPath);
            logger.log('Avatars folder successfully moved to the old location ...');
        }
        catch (err) {
            logger.error(err);
            logger.log('Unable to move avatar files to the old folder ...');
        }
    }
    else {
        logger.log('No avatars folder found ...');
    }
};
const migrateAttachmentBlocks = async (action, { logger }) => {
    const updateField = action === types_3.MigrationAction.UP ? 'id' : 'attachment_id';
    const unsetField = action === types_3.MigrationAction.UP ? 'attachment_id' : 'id';
    const BlockModel = mongoose_1.default.model(block_schema_1.Block.name, block_schema_1.default);
    const cursor = BlockModel.find({
        'message.attachment': { $exists: true },
    }).cursor();
    for await (const block of cursor) {
        try {
            const blockMessage = block.message;
            const fieldValue = blockMessage.attachment?.payload &&
                unsetField in blockMessage.attachment?.payload
                ? blockMessage.attachment?.payload[unsetField]
                : null;
            await BlockModel.updateOne({ _id: block._id }, {
                $set: {
                    [`message.attachment.payload.${updateField}`]: fieldValue,
                },
                $unset: {
                    [`message.attachment.payload.${unsetField}`]: '',
                },
            });
        }
        catch (error) {
            logger.error(`Failed to process block ${block._id}: ${error.message}`);
        }
    }
};
const buildRenameAttributeCallback = (source, target) => (obj) => {
    obj[target] = obj[source];
    delete obj[source];
    return obj;
};
const updateAttachmentPayload = (obj, callback) => {
    if (obj && typeof obj === 'object') {
        for (const key in obj) {
            if (obj[key] && typeof obj[key] === 'object' && 'payload' in obj[key]) {
                obj[key].payload = callback(obj[key].payload);
            }
        }
    }
    return obj;
};
const migrateAttachmentContents = async (action, { logger }) => {
    const updateField = action === types_3.MigrationAction.UP ? 'id' : 'attachment_id';
    const unsetField = action === types_3.MigrationAction.UP ? 'attachment_id' : 'id';
    const ContentModel = mongoose_1.default.model(content_schema_1.Content.name, content_schema_1.default);
    const AttachmentModel = mongoose_1.default.model(attachment_schema_1.Attachment.name, attachment_schema_1.default);
    const adminUser = await getAdminUser();
    const cursor = ContentModel.find({}).cursor();
    for await (const content of cursor) {
        try {
            content.dynamicFields = updateAttachmentPayload(content.dynamicFields, buildRenameAttributeCallback(unsetField, updateField));
            for (const key in content.dynamicFields) {
                if (content.dynamicFields[key] &&
                    typeof content.dynamicFields[key] === 'object' &&
                    'payload' in content.dynamicFields[key] &&
                    'id' in content.dynamicFields[key].payload &&
                    content.dynamicFields[key].payload.id) {
                    await AttachmentModel.updateOne({
                        _id: content.dynamicFields[key].payload.id,
                    }, {
                        $set: {
                            resourceRef: types_1.AttachmentResourceRef.ContentAttachment,
                            createdBy: adminUser.id,
                            createdByRef: types_1.AttachmentCreatedByRef.User,
                            access: types_1.AttachmentAccess.Public,
                        },
                    });
                }
            }
            await ContentModel.replaceOne({ _id: content._id }, content);
        }
        catch (error) {
            logger.error(`Failed to update content ${content._id}: ${error.message}`);
        }
    }
};
const migrateAndPopulateAttachmentMessages = async ({ logger, http, attachmentService, }) => {
    const MessageModel = mongoose_1.default.model(message_schema_1.Message.name, message_schema_1.default);
    const cursor = MessageModel.find({
        'message.attachment.payload': { $exists: true },
        'message.attachment.payload.id': { $exists: false },
    }).cursor();
    const updateAttachmentId = async (messageId, attachmentId) => {
        await MessageModel.updateOne({ _id: messageId }, { $set: { 'message.attachment.payload.id': attachmentId } });
    };
    const adminUser = await getAdminUser();
    for await (const msg of cursor) {
        try {
            if ('attachment' in msg.message &&
                'payload' in msg.message.attachment &&
                msg.message.attachment.payload) {
                if ('attachment_id' in msg.message.attachment.payload) {
                    await attachmentService.updateOne(msg.message.attachment.payload.attachment_id, {
                        resourceRef: types_1.AttachmentResourceRef.MessageAttachment,
                        access: types_1.AttachmentAccess.Private,
                        createdByRef: msg.sender
                            ? types_1.AttachmentCreatedByRef.Subscriber
                            : types_1.AttachmentCreatedByRef.User,
                        createdBy: msg.sender ? msg.sender : adminUser.id,
                    });
                    await updateAttachmentId(msg._id, msg.message.attachment.payload.attachment_id);
                }
                else if ('url' in msg.message.attachment.payload) {
                    const url = msg.message.attachment.payload.url;
                    const regex = /^https?:\/\/[\w.-]+\/attachment\/download\/([a-f\d]{24})\/.+$/;
                    const match = url.match(regex);
                    if (match) {
                        const [, attachmentId] = match;
                        await updateAttachmentId(msg._id, attachmentId);
                    }
                    else if (url) {
                        logger.log(`Migrate message ${msg._id}: Handling an external url ...`);
                        const response = await http.axiosRef.get(url, {
                            responseType: 'arraybuffer',
                        });
                        const fileBuffer = Buffer.from(response.data);
                        const attachment = await attachmentService.store(fileBuffer, {
                            name: (0, uuid_1.v4)(),
                            size: fileBuffer.length,
                            type: response.headers['content-type'],
                            channel: {},
                            resourceRef: types_1.AttachmentResourceRef.MessageAttachment,
                            access: msg.sender
                                ? types_1.AttachmentAccess.Private
                                : types_1.AttachmentAccess.Public,
                            createdBy: msg.sender ? msg.sender : adminUser.id,
                            createdByRef: msg.sender
                                ? types_1.AttachmentCreatedByRef.Subscriber
                                : types_1.AttachmentCreatedByRef.User,
                        });
                        if (attachment) {
                            await updateAttachmentId(msg._id, attachment.id);
                        }
                        else {
                            logger.warn(`Unable to store attachment for message ${msg._id}`);
                        }
                    }
                }
                else {
                    logger.warn(`Unable to migrate message ${msg._id}: No ID nor URL was found`);
                    throw new Error('Unable to process message attachment: No ID or URL to be processed');
                }
            }
            else {
                throw new Error('Unable to process message attachment: Invalid Payload');
            }
        }
        catch (error) {
            logger.error(`Failed to update message ${msg._id}: ${error.message}, defaulting to null`);
            try {
                await updateAttachmentId(msg._id, null);
            }
            catch (err) {
                logger.error(`Failed to update message ${msg._id}: ${error.message}, unable to default to null`);
            }
        }
    }
};
const addDefaultStorageHelper = async ({ logger }) => {
    const SettingModel = mongoose_1.default.model(setting_schema_1.Setting.name, setting_schema_1.default);
    try {
        await SettingModel.updateOne({
            group: 'chatbot_settings',
            label: 'default_storage_helper',
        }, {
            group: 'chatbot_settings',
            label: 'default_storage_helper',
            value: 'local-storage-helper',
            type: types_2.SettingType.select,
            config: {
                multiple: false,
                allowCreate: false,
                entity: 'Helper',
                idKey: 'name',
                labelKey: 'name',
            },
            weight: 2,
        }, {
            upsert: true,
        });
        logger.log('Successfuly added the default local storage helper setting');
    }
    catch (err) {
        logger.error('Unable to add the default local storage helper setting');
    }
};
const removeDefaultStorageHelper = async ({ logger }) => {
    const SettingModel = mongoose_1.default.model(setting_schema_1.Setting.name, setting_schema_1.default);
    try {
        await SettingModel.deleteOne({
            group: 'chatbot_settings',
            label: 'default_storage_helper',
        });
        logger.log('Successfuly removed the default local storage helper setting');
    }
    catch (err) {
        logger.error('Unable to remove the default local storage helper setting');
    }
};
module.exports = {
    async up(services) {
        await updateOldAvatarsPath(services);
        await migrateAttachmentBlocks(types_3.MigrationAction.UP, services);
        await migrateAttachmentContents(types_3.MigrationAction.UP, services);
        await migrateAndPopulateAttachmentMessages(services);
        await populateBlockAttachments(services);
        await populateSettingAttachments(services);
        await populateUserAvatars(services);
        await populateSubscriberAvatars(services);
        await addDefaultStorageHelper(services);
        return true;
    },
    async down(services) {
        await undoPopulateAttachments(services);
        await unpopulateSubscriberAvatar(services);
        await restoreOldAvatarsPath(services);
        await migrateAttachmentBlocks(types_3.MigrationAction.DOWN, services);
        await migrateAttachmentContents(types_3.MigrationAction.DOWN, services);
        await removeDefaultStorageHelper(services);
        return true;
    },
};
//# sourceMappingURL=1735836154221-v-2-2-0.migration.js.map