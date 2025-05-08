/// <reference types="passport" />
import { Request, Response } from 'express';
import { Session as ExpressSession } from 'express-session';
import { LoggerService } from '@/logger/logger.service';
import { UserCreateDto } from '../dto/user.dto';
import { InvitationService } from '../services/invitation.service';
import { UserService } from '../services/user.service';
import { ValidateAccountService } from '../services/validate-account.service';
export declare class BaseAuthController {
    protected readonly logger: LoggerService;
    private readonly eventEmitter;
    constructor(logger: LoggerService);
    me(req: Request): Express.User | undefined;
    logout(session: ExpressSession, res: Response): {
        status: string;
    };
}
export declare class LocalAuthController extends BaseAuthController {
    private readonly userService;
    private readonly validateAccountService;
    private readonly invitationService;
    constructor(logger: LoggerService, userService: UserService, validateAccountService: ValidateAccountService, invitationService: InvitationService);
    login(req: Request): Express.User | undefined;
    signup(userCreateDto: UserCreateDto): Promise<{
        success: boolean;
    }>;
    acceptInvite(userCreateDto: UserCreateDto, token: string): Promise<void>;
}
