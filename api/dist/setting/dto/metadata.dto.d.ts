export declare class MetadataCreateDto {
    name: string;
    value: any;
}
declare const MetadataUpdateDto_base: import("@nestjs/common").Type<Partial<MetadataCreateDto>>;
export declare class MetadataUpdateDto extends MetadataUpdateDto_base {
}
export {};
