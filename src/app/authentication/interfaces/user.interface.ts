import { Company } from '../company/interfaces/company.interface';
import { Role } from './role.interface';

export interface User {
  _id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Password?: string;
  Username?: string;
  RoleID: Role;
  Company?: Company;
  __v?: number;
}

export interface LoggedInResponse {
  _id: string;
  Username: string;
  Email: string;
  AccessToken: string;
}
