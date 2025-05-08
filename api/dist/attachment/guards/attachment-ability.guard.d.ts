import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ModelService } from '@/user/services/model.service';
import { PermissionService } from '@/user/services/permission.service';
import { AttachmentService } from '../services/attachment.service';
export declare class AttachmentGuard implements CanActivate {
    private readonly permissionService;
    private readonly modelService;
    private readonly attachmentService;
    constructor(permissionService: PermissionService, modelService: ModelService, attachmentService: AttachmentService);
    private permissionMap;
    private hasPermission;
    private isAuthorized;
    canActivate(ctx: ExecutionContext): Promise<boolean>;
}
