import { BaseService } from '@/utils/generics/base-service';
import { RoleDto } from '../dto/role.dto';
import { RoleRepository } from '../repositories/role.repository';
import { Role, RoleFull, RolePopulate } from '../schemas/role.schema';
export declare class RoleService extends BaseService<Role, RolePopulate, RoleFull, RoleDto> {
    readonly repository: RoleRepository;
    constructor(repository: RoleRepository);
}
