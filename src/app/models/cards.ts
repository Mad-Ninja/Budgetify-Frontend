export interface ICard {
  _id: string;
  name: string;
  amount: number;
  currency: {
    name: string;
    code: string;
    symbolNative: string;
  };
  description: string;
  userId: string;
  createdAt: string;
  updateAt: string;
}
