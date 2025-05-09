/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { HydratedDocument, QuerySelector, RootQuerySelector } from 'mongoose';
export type TFilterKeysOfType<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];
export type TFilterKeysOfNeverType<T> = Omit<T, TFilterKeysOfType<T, []>>;
export type NestedKeys<T> = T extends object ? {
    [K in keyof T]: T[K] extends Function ? never : Array<any> extends T[K] ? Exclude<K, symbol> : K extends symbol ? Exclude<K, symbol> : `${Exclude<K, symbol>}${'' | `.${NestedKeys<T[K]>}`}`;
}[keyof T] : never;
export type ObjectWithNestedKeys<T, ValueType = any> = Partial<{
    [K in NestedKeys<T>]: ValueType;
}>;
export type TFilterNestedKeysOfType<T, U> = T extends object ? {
    [K in keyof T]: T[K] extends U ? `${K & string}` : T[K] extends object ? Array<any> extends T[K] ? never : `${K & string}.${TFilterNestedKeysOfType<T[K], U>}` : never;
}[keyof T] : never;
export type WithoutGenericAny<T> = {
    [K in keyof T as string extends K ? never : K]: T[K];
};
export type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[] ? RecursivePartial<U>[] : T[P] extends object ? RecursivePartial<T[P]> : T[P];
};
type TAllowedKeys<T, TStub, TValue = (string | null | undefined)[]> = {
    [key in keyof Record<TFilterKeysOfType<TFilterPopulateFields<TFilterKeysOfNeverType<T>, TStub>, TValue>, TValue>]: TValue;
};
type TVirtualFields<T> = Pick<T, TFilterKeysOfType<T, undefined>>;
export type TValidateProps<T, TStub> = {
    dto: Partial<TAllowedKeys<T, TStub>> | Partial<TAllowedKeys<T, TStub, string>>;
    allowedIds: Omit<TAllowedKeys<T, TStub, null | undefined | string | string[]>, keyof TVirtualFields<T>>;
};
export type TFilterPopulateFields<T, TStub> = Omit<T, TFilterKeysOfType<TStub, null | undefined | string | number | boolean | object>>;
type TField<T> = {
    [key in T & string]: {
        contains: string;
    };
};
type TOrField<T> = {
    where?: {
        or: TField<T>[];
    };
};
type TAndField<T> = {
    where?: TField<T>;
};
type TNorField<T> = {
    where?: {
        [key in T & string]: {
            '!=': string;
        };
    };
};
export type TSearchFilterValue<T> = TOrField<T> | TAndField<T> | TNorField<T>;
type TOperator = 'eq' | 'iLike' | 'neq';
type TContext = 'and' | 'or';
export type TTransformFieldProps = {
    _id?: string;
    _context?: TContext;
    _operator?: TOperator;
    data?: {
        [x: string]: undefined | string | RegExp | (string | undefined)[];
    };
};
type TOmitId<T> = Omit<T, 'id'>;
type TReplaceId<T> = TOmitId<T> & {
    _id?: string;
};
export type TFilterQuery<T, S = TReplaceId<T>> = (RecursivePartial<{
    [P in keyof S]?: (S[P] extends string ? S[P] | RegExp : S[P]) | QuerySelector<S[P]>;
}> | Partial<ObjectWithNestedKeys<S>>) & WithoutGenericAny<RootQuerySelector<S>>;
export type THydratedDocument<T> = TOmitId<HydratedDocument<T>>;
export {};
