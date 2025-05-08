import { ChannelService } from './channel.service';
export declare class ChannelController {
    private readonly channelService;
    constructor(channelService: ChannelService);
    getChannels(): {
        name: string;
    }[];
}
