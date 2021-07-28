import { User } from "src/app/authentication/interfaces/user.interface";

export interface Post
 {
   _id: number,
   content: string
   author: User,
   likes: User[]
   created_at: Date
 }
