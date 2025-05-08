import { BaseSeeder } from '@/utils/generics/base-seeder';
import { RoleDto } from '../dto/role.dto';
import { RoleRepository } from '../repositories/role.repository';
import { Role, RoleFull, RolePopulate } from '../schemas/role.schema';
export declare class RoleSeeder extends BaseSeeder<Role, RolePopulate, RoleFull, RoleDto> {
    private readonly roleRepository;
    constructor(roleRepository: RoleRepository);
}
