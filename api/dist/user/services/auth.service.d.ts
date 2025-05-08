import { UserService } from './user.service';
export declare class AuthService {
    private readonly userService;
    constructor(userService: UserService);
    validateUser(email: string, password: string): Promise<import("../schemas/user.schema").User | null>;
}
