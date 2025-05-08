import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PermissionService } from '../services/permission.service';
export declare class Ability implements CanActivate {
    private reflector;
    private readonly permissionService;
    private readonly eventEmitter;
    constructor(reflector: Reflector, permissionService: PermissionService, eventEmitter: EventEmitter2);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
