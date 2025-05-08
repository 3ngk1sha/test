import { Request } from 'express';
import { BaseController } from '@/utils/generics/base-controller';
import { PageQueryDto } from '@/utils/pagination/pagination-query.dto';
import { TFilterQuery } from '@/utils/types/filter.types';
import { RoleCreateDto, RoleUpdateDto } from '../dto/role.dto';
import { Role, RoleFull, RolePopulate, RoleStub } from '../schemas/role.schema';
import { RoleService } from '../services/role.service';
import { UserService } from '../services/user.service';
export declare class RoleController extends BaseController<Role, RoleStub, RolePopulate, RoleFull> {
    private readonly roleService;
    private readonly userService;
    constructor(roleService: RoleService, userService: UserService);
    findPage(pageQuery: PageQueryDto<Role>, populate: string[], filters: TFilterQuery<Role>): Promise<Role[] | RoleFull[]>;
    filterCount(filters?: TFilterQuery<Role>): Promise<{
        count: number;
    }>;
    findOne(id: string, populate: string[]): Promise<Role | RoleFull>;
    create(role: RoleCreateDto): Promise<Role>;
    updateOne(id: string, roleUpdate: RoleUpdateDto): Promise<Role>;
    deleteOne(id: string, req: Request): Promise<import("../../utils/generics/base-repository").DeleteResult>;
}
