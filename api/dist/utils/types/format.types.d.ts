export declare enum Format {
    NONE = 0,
    STUB = 1,
    BASIC = 2,
    FULL = 3
}
export type TStubOrFull<TF, TStub, TFull> = TF extends Format.STUB ? TStub : TFull;
