export type AuthUser = {
  userId: string;
};

export type CurrentUserResponse = {
  user: AuthUser;
};
export type AuthenticatedUser = {
  id: string;
  email: string;
};
export type AuthUserResponse = {
  user: AuthenticatedUser;
};

export type LogoutResponse = {
  message: string;
};
