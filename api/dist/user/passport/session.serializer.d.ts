import { PassportSerializer } from '@nestjs/passport';
import { SessionUser } from 'express-session';
import { User } from '../schemas/user.schema';
import { UserService } from '../services/user.service';
export declare class AuthSerializer extends PassportSerializer {
    private readonly userService;
    constructor(userService: UserService);
    serializeUser(user: User, done: (err: Error | null, user: SessionUser) => void): void;
    deserializeUser(payload: SessionUser, done: (err: Error | null, user: SessionUser | null) => void): Promise<void>;
}
