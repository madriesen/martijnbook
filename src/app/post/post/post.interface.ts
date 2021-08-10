import { User } from 'src/app/authentication/interfaces/user.interface';

export interface Post {
  _id: string;
  Content: string;
  Author: User;
  Likes: User[];
  Comments: Comment[];
  createdAt: string;
}

interface Comment {
  _id: string;
  Author: User;
  Content: string;
  Likes: User[];
  createdAt: string;
}
