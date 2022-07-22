export interface UserType {
  _id: string;
  username: string;
  email: string;
  avatarImage: string | null;
  createdAt: string;
  updatedAt: string;
  socketId: string | null;
  isOnline: boolean;
}
