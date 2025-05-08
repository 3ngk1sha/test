import { DtoConfig } from '@/utils/types/dto.types';
export declare class UserCreateDto {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    roles: string[];
    avatar: string | null;
    state?: boolean;
}
declare const UserEditProfileDto_base: import("@nestjs/common").Type<Omit<Partial<UserCreateDto>, "roles" | "avatar" | "username" | "state">>;
export declare class UserEditProfileDto extends UserEditProfileDto_base {
    language?: string;
}
export declare class UserUpdateStateAndRolesDto {
    state?: boolean;
    roles?: string[];
}
declare const UserResetPasswordDto_base: import("@nestjs/mapped-types").MappedType<Pick<UserCreateDto, "password">>;
export declare class UserResetPasswordDto extends UserResetPasswordDto_base {
}
declare const UserRequestResetDto_base: import("@nestjs/mapped-types").MappedType<Pick<UserCreateDto, "email">>;
export declare class UserRequestResetDto extends UserRequestResetDto_base {
}
export type UserDto = DtoConfig<{
    create: UserCreateDto;
}>;
export {};
