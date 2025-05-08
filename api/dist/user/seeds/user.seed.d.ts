import { BaseSeeder } from '@/utils/generics/base-seeder';
import { UserRepository } from '../repositories/user.repository';
import { User, UserFull, UserPopulate } from '../schemas/user.schema';
export declare class UserSeeder extends BaseSeeder<User, UserPopulate, UserFull> {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
}
