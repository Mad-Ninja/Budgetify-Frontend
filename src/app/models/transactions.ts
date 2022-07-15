import { ICurrency } from './currency';

export interface ITransaction {
  _id: string;
  type: string;
  amount: number;
  category: string[];
  title: string;
  dateOfPayment: string;
  payee: string;
  description: string;
  currency: string;
  createdAt?: string;
  updateAt?: string;
  accountId: string;
  trackBy?:string;
}
