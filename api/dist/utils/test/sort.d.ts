type TSortProps<T> = {
    row1: T;
    row2: T;
    field?: keyof T | 'createdAt';
    order?: 'desc' | 'asc';
};
type TCreatedAt = {
    createdAt?: string | Date;
};
export declare const sortRowsBy: <R extends TCreatedAt, S, T extends TCreatedAt = R & S>(row1: T, row2: T, field?: keyof T | undefined, order?: "asc" | "desc" | undefined) => 1 | -1;
export {};
