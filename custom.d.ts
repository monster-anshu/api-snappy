declare namespace Express {
  export interface Request {
    user?: {
      _id: string;
      username: string;
      email: string;
      password: string;
      isAvatarImageSet: boolean;
      createdAt: string;
      updatedAt: string;
    };
  }
}
