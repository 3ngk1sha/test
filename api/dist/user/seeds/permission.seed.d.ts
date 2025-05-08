import { BaseSeeder } from '@/utils/generics/base-seeder';
import { PermissionDto } from '../dto/permission.dto';
import { PermissionRepository } from '../repositories/permission.repository';
import { Permission, PermissionFull, PermissionPopulate } from '../schemas/permission.schema';
export declare class PermissionSeeder extends BaseSeeder<Permission, PermissionPopulate, PermissionFull, PermissionDto> {
    private readonly permissionRepository;
    constructor(permissionRepository: PermissionRepository);
}
