import { Invitation } from '@/user/schemas/invitation.schema';
import { TFixtures } from '../types';
export declare const invitationsFixtures: TFixtures<Invitation>[];
export declare const installInvitationFixtures: () => Promise<{
    roles: any[];
    invitations: any[];
}>;
