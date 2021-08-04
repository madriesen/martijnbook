import { User } from 'src/app/authentication/interfaces/user.interface';

export interface Post {
  _id: string;
  Content: string;
  Author: User;
  Likes: User[];
  createdAt: Date;
}
