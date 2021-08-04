export interface User {
  _id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Password?: string;
  Username?: string;
  RoleID?: string | Record<string, any>;
}

export interface LoggedInResponse {
  Id: string;
  Username: string;
  Email: string;
  AccessToken: string;
}
