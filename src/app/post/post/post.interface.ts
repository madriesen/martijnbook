import { User } from "src/app/authentication/interfaces/user.interface";

export interface Post
 {
   Id: number,
   Content: string
   Author: User,
   Likes: User[]
   created_at: Date
 }
