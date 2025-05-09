import { EventEmitter2 } from '@nestjs/event-emitter';
import { AttachmentService } from '@/attachment/services/attachment.service';
import { ChannelService } from '@/channel/channel.service';
import { MessageService } from '@/chat/services/message.service';
import { SubscriberService } from '@/chat/services/subscriber.service';
import { MenuService } from '@/cms/services/menu.service';
import { I18nService } from '@/i18n/services/i18n.service';
import { LoggerService } from '@/logger/logger.service';
import { SettingService } from '@/setting/services/setting.service';
import { WebsocketGateway } from '@/websocket/websocket.gateway';
import BaseWebChannelHandler from './base-web-channel';
import { WEB_CHANNEL_NAME } from './settings';
export default class WebChannelHandler extends BaseWebChannelHandler<typeof WEB_CHANNEL_NAME> {
    constructor(settingService: SettingService, channelService: ChannelService, logger: LoggerService, eventEmitter: EventEmitter2, i18n: I18nService, subscriberService: SubscriberService, attachmentService: AttachmentService, messageService: MessageService, menuService: MenuService, websocketGateway: WebsocketGateway);
    getPath(): string;
}
