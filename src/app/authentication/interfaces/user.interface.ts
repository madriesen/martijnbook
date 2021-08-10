export interface User {
  _id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Password?: string;
  Username?: string;
  RoleID?: string | Record<string, any>;
  __v?: number;
}

export interface LoggedInResponse {
  _id: string;
  Username: string;
  Email: string;
  AccessToken: string;
}
