import { HttpService } from '@nestjs/axios';
import { RawBodyRequest } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NextFunction, Request, Response } from 'express';
import { AttachmentService } from '@/attachment/services/attachment.service';
import { AttachmentFile } from '@/attachment/types';
import { ChannelService } from '@/channel/channel.service';
import ChannelHandler from '@/channel/lib/Handler';
import { SubscriberCreateDto } from '@/chat/dto/subscriber.dto';
import { Label, LabelDocument } from '@/chat/schemas/label.schema';
import { Subscriber } from '@/chat/schemas/subscriber.schema';
import { FileType } from '@/chat/schemas/types/attachment';
import { ContentElement, StdOutgoingAttachmentMessage, StdOutgoingButtonsMessage, StdOutgoingEnvelope, StdOutgoingListMessage, StdOutgoingQuickRepliesMessage, StdOutgoingTextMessage } from '@/chat/schemas/types/message';
import { BlockOptions } from '@/chat/schemas/types/options';
import { LabelService } from '@/chat/services/label.service';
import { MessageService } from '@/chat/services/message.service';
import { SubscriberService } from '@/chat/services/subscriber.service';
import { MenuService } from '@/cms/services/menu.service';
import { I18nService } from '@/i18n/services/i18n.service';
import { LanguageService } from '@/i18n/services/language.service';
import { LoggerService } from '@/logger/logger.service';
import { Setting } from '@/setting/schemas/setting.schema';
import { CheckboxSetting, TextareaSetting } from '@/setting/schemas/types';
import { SettingService } from '@/setting/services/setting.service';
import { BaseSchema } from '@/utils/generics/base-schema';
import { TFilterQuery } from '@/utils/types/filter.types';
import { GraphApi } from './lib/graph-api';
import { MESSENGER_CHANNEL_NAME } from './settings';
import { Messenger } from './types';
import MessengerEventWrapper from './wrapper';
export default class MessengerHandler extends ChannelHandler<typeof MESSENGER_CHANNEL_NAME> {
    protected readonly eventEmitter: EventEmitter2;
    protected readonly i18n: I18nService;
    protected readonly languageService: LanguageService;
    protected readonly subscriberService: SubscriberService;
    readonly attachmentService: AttachmentService;
    protected readonly messageService: MessageService;
    protected readonly menuService: MenuService;
    protected readonly labelService: LabelService;
    protected readonly httpService: HttpService;
    protected api: GraphApi;
    constructor(settingService: SettingService, channelService: ChannelService, logger: LoggerService, eventEmitter: EventEmitter2, i18n: I18nService, languageService: LanguageService, subscriberService: SubscriberService, attachmentService: AttachmentService, messageService: MessageService, menuService: MenuService, labelService: LabelService, httpService: HttpService);
    getPath(): string;
    init(): Promise<void>;
    getMessageAttachments(event: MessengerEventWrapper): Promise<AttachmentFile[]>;
    onLabelCreate(label: LabelDocument, callback: (result: Record<string, string>) => Promise<void>): Promise<void>;
    onLabelDelete(labels: Label[]): Promise<void>;
    handleSubscriberUpdate(criteria: string | TFilterQuery<Subscriber>, updates: Partial<Omit<Subscriber, keyof BaseSchema>>): Promise<void>;
    onGreetingTextUpdate(setting: TextareaSetting): Promise<void>;
    onToggleGetStartedButton(setting: CheckboxSetting): Promise<void>;
    onAccessTokenUpdate(setting: Setting): Promise<void>;
    onToggleComposerInput(setting: CheckboxSetting): Promise<void>;
    onMenuUpdate(): Promise<void>;
    middleware(req: RawBodyRequest<Request>, _res: Response, next: NextFunction): Promise<void>;
    _verifySignature(req: Request, res: Response, next: () => void): void | Response<any, Record<string, any>>;
    _validateMessage(req: Request, res: Response, next: () => void): void | Response<any, Record<string, any>>;
    subscribe(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    handle(req: Request, res: Response): Promise<void | Response<any, Record<string, any>>>;
    _textFormat(message: StdOutgoingTextMessage, _options?: any): Messenger.OutgoingMessageBase;
    _quickRepliesFormat(message: StdOutgoingQuickRepliesMessage, _options?: any): Messenger.OutgoingMessageBase;
    _buttonsFormat(message: StdOutgoingButtonsMessage, _options: BlockOptions): Messenger.OutgoingMessageBase;
    toAttachmentType(fileType: FileType): Messenger.AttachmentType;
    _attachmentFormat(message: StdOutgoingAttachmentMessage, _options: BlockOptions): Promise<Messenger.OutgoingMessageBase>;
    _formatElements(data: ContentElement[], options: BlockOptions): Promise<Messenger.MessageElement[]>;
    _listFormat(message: StdOutgoingListMessage, options: BlockOptions): Promise<Messenger.OutgoingMessageBase>;
    _carouselFormat(message: StdOutgoingListMessage, options: BlockOptions): Promise<Messenger.OutgoingMessageBase>;
    _formatTemplate(payload: Messenger.TemplateButtons | Messenger.TemplateGeneric): Messenger.OutgoingMessageBase;
    _formatMessage(envelope: StdOutgoingEnvelope, options: BlockOptions): Promise<Messenger.OutgoingMessageBase>;
    sendMessage(event: MessengerEventWrapper, envelope: StdOutgoingEnvelope, options: BlockOptions, _context?: any): Promise<{
        mid: string;
    }>;
    sendTypingIndicator(recipientId: string, timeout: number): Promise<any>;
    getSubscriberAvatar(event: MessengerEventWrapper): Promise<AttachmentFile | undefined>;
    getSubscriberData(event: MessengerEventWrapper): Promise<SubscriberCreateDto>;
    updateUserLabels(subscriberForeignId: string, oldLabels: string[], newLabels: string[]): Promise<any>;
    _setGreetingText(text: string | Messenger.GreetingText[]): Promise<any>;
    _setGetStartedButton(): Promise<any>;
    _deleteGetStartedButton(): Promise<any>;
    private formatMenu;
    _setPersistentMenu(composer_input_disabled?: boolean): Promise<any>;
    _deletePersistentMenu(): Promise<any>;
}
