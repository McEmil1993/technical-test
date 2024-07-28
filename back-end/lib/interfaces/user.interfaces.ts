export interface IUser {
  id?: number;
  name: string;
  email: string;
  password?: string;
  created_at?: Date;
  role?: string;
}

export interface IUserReturn {
  data: IUser[] | null;
}

export interface IUSerToken {
  token: string;
  name: string;
  email: string;
  role: string;
}
