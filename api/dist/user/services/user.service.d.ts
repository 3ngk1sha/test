import { BaseService } from '@/utils/generics/base-service';
import { UserDto } from '../dto/user.dto';
import { UserRepository } from '../repositories/user.repository';
import { User, UserFull, UserPopulate } from '../schemas/user.schema';
export declare class UserService extends BaseService<User, UserPopulate, UserFull, UserDto> {
    readonly repository: UserRepository;
    constructor(repository: UserRepository);
}
