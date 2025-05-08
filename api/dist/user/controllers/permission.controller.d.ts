import { BaseController } from '@/utils/generics/base-controller';
import { TFilterQuery } from '@/utils/types/filter.types';
import { PermissionCreateDto } from '../dto/permission.dto';
import { Permission, PermissionFull, PermissionPopulate, PermissionStub } from '../schemas/permission.schema';
import { ModelService } from '../services/model.service';
import { PermissionService } from '../services/permission.service';
import { RoleService } from '../services/role.service';
export declare class PermissionController extends BaseController<Permission, PermissionStub, PermissionPopulate, PermissionFull> {
    private readonly permissionService;
    private readonly roleService;
    private readonly modelService;
    constructor(permissionService: PermissionService, roleService: RoleService, modelService: ModelService);
    find(populate: string[], filters: TFilterQuery<Permission>): Promise<Permission[] | PermissionFull[]>;
    create(permission: PermissionCreateDto): Promise<Permission>;
    deleteOne(id: string): Promise<import("../../utils/generics/base-repository").DeleteResult>;
}
