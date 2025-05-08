export declare enum DtoAction {
    Create = "create",
    Read = "read",
    Update = "update",
    Delete = "delete"
}
export type DtoConfig<C extends Partial<Record<DtoAction, object>> = Partial<Record<DtoAction, object>>> = C;
export type DtoInfer<K extends keyof Dto, Dto, I> = Dto[K] extends object ? Dto[K] : I;
