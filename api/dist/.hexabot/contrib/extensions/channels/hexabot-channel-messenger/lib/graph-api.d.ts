import { HttpService } from '@nestjs/axios';
import { Messenger } from '../types';
import { CustomLabelsAPI } from './custom-labels-api';
import { ProfileAPI } from './profile-api';
import SendAPI from './send-api';
export interface GraphRequestOptions {
    apiVersion?: string;
    qs?: {
        [key: string]: any;
    };
    path?: string;
    method?: string;
    payload?: Messenger.RequestBody;
    formData?: {
        [key: string]: any;
    };
}
export declare class GraphApi {
    private readonly httpService;
    private readonly pageToken;
    readonly send: SendAPI;
    readonly profile: ProfileAPI;
    readonly customLabels: CustomLabelsAPI;
    private graphApiVersion;
    constructor(httpService: HttpService, pageToken: string);
    setApiVersion(version: string): string;
    getApiVersion(): string;
    sendRequest(options: GraphRequestOptions): Promise<any>;
}
