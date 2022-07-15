import { ICategory } from './categories';

export interface UserModel {
  _id: string;
  email: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  gender: string;
  birth: string;
  country: string;
  categories: ICategory[];
  _v?: number;
}
