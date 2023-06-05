export interface Comment {
  postId: string;
  userId: string;
  content: string;
  user: {
    username: string;
    profilePicture: string;
  };
}
