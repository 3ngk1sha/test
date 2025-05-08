import { Messenger } from '../types';
import { GraphApi } from './graph-api';
export declare class ProfileAPI {
    private readonly graphRequest;
    constructor(graphRequest: GraphApi);
    setMessengerProfile(fields: Messenger.Profile): Promise<any>;
    deleteMessengerProfile(fields: string[]): Promise<any>;
    getUserProfile(psid: string, userFields: string): Promise<Messenger.UserData>;
    call(profile: string | Messenger.Profile, path?: string): Promise<any>;
}
