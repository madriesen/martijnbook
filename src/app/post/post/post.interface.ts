import { User } from "src/app/authentication/interfaces/user.interface";

export interface Post
 {
   content: string
   author: User
   created_at: Date
 }
