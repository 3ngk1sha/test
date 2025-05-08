import { GraphApi } from './graph-api';
export declare class CustomLabelsAPI {
    private readonly graphRequest;
    constructor(graphRequest: GraphApi);
    createCustomLabel(name: string): Promise<any>;
    getCustomLabelById(label_id: string): Promise<any>;
    deleteCustomLabel(label_id: string): Promise<any>;
    addPsidtoCustomLabel(psid: string, label_id: string): Promise<any>;
    removePsidfromCustomLabel(psid: string, label_id: string): Promise<any>;
    private callCustomLabelsApi;
}
