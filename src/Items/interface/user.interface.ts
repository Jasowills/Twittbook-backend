export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  isFollowing: number;
  followers: number;
  createdAt: Date;
  isVerified: boolean; // New field: isVerified
}
