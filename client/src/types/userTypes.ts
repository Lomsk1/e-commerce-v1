export interface UserTypes {
  status: string;
  token: string;
  user: {
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    role: string;
    passwordChangedAt?: string;
  };
}

export interface UsersTypes {
  status: string;
  result: number;
  data: {
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    role: string;
    passwordChangedAt?: string;
  }[];
}

export interface UserDecodedTypes {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  iat: number;
  exp: number;
}

export interface ResetPasswordTypes {
  status: string;
  message: string;
}
