export type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string[];
};

export type UserLoginForm = {
  email: string;
  password: string;
};

export type UserToken = {
  token: string;
  expiresAt: string;
};
