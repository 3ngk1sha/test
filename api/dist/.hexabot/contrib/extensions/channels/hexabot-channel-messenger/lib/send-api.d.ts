import { Messenger } from '../types';
import { GraphApi } from './graph-api';
export declare class SendAPI {
    private readonly graphRequest;
    constructor(graphRequest: GraphApi);
    sendSenderAction(payload: Messenger.Action): Promise<any>;
    call(payload: Messenger.OutgoingMessage | Messenger.Action): Promise<any>;
}
export default SendAPI;
