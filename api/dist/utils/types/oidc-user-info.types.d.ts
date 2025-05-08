export type UserInfo = {
    sub: string;
    email: string;
    preferred_username: string;
    given_name?: string;
    family_name?: string;
    roles?: string[];
};
