import { UserModel } from './user.model';

export interface SessionModel {
 user?: UserModel;
 token?: string;
 loading?: boolean;
 loaded?: boolean;
}
