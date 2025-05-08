import { Cache } from 'cache-manager';
import { BaseService } from '@/utils/generics/base-service';
import { PermissionDto } from '../dto/permission.dto';
import { PermissionRepository } from '../repositories/permission.repository';
import { Permission, PermissionFull, PermissionPopulate } from '../schemas/permission.schema';
import { PermissionsTree } from '../types/permission.type';
export declare class PermissionService extends BaseService<Permission, PermissionPopulate, PermissionFull, PermissionDto> {
    readonly repository: PermissionRepository;
    private readonly cacheManager;
    constructor(repository: PermissionRepository, cacheManager: Cache);
    handlePermissionUpdateEvent(): Promise<void>;
    getPermissions(): Promise<PermissionsTree>;
    buildTree(permissions: PermissionFull[]): PermissionsTree;
}
