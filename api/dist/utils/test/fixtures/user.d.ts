import { UserCreateDto } from '@/user/dto/user.dto';
import { User } from '@/user/schemas/user.schema';
import { TFixturesDefaultValues } from '../types';
export declare const users: UserCreateDto[];
export declare const userDefaultValues: TFixturesDefaultValues<User>;
export declare const getUserFixtures: (users: UserCreateDto[]) => import("../types").TFixtures<User>[];
export declare const userFixtures: import("../types").TFixtures<User>[];
export declare const installUserFixtures: () => Promise<{
    roles: any[];
    users: any[];
}>;
