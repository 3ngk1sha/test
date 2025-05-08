export declare class SocketEventMetadataStorage {
    private static metadata;
    static addEventMetadata(target: any, propertyKey: string | symbol, metadata: any): void;
    static getMetadataFor(target: any): any[];
}
