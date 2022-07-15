import { RoleClaim } from './role-claim.interface';

export interface Role {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  claims: RoleClaim[];
}
