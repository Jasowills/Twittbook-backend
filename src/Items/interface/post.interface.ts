export interface Post {
  populate(arg0: string, arg1: string): unknown;
  content: string;
  userId: string;
  likes?: number;
  image?: string;
  comments?: number;
  createdAt?: Date;
  user: {
    username: string;
    profilePicture: string;
  };
}
