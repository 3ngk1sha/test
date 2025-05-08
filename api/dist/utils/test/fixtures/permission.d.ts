import { PermissionCreateDto } from '@/user/dto/permission.dto';
export declare const permissionFixtures: PermissionCreateDto[];
export declare const installPermissionFixtures: () => Promise<{
    roles: any[];
    users: any[];
    permissions: any[];
}>;
