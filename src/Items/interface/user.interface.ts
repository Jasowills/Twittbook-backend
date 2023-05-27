export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  isFollowing: number;
  followers: number;
  createdAt: Date;
}
