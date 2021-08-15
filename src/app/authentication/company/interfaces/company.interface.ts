import { User } from '../../interfaces/user.interface';

export interface Company {
  _id: string;
  Address: string;
  Name: string;
  Description: string;
  Users?: User[];
}
