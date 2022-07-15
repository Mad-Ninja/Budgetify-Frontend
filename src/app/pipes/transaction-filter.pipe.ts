import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../models/categories';
import { ITransaction } from '../models/transactions';
@Pipe({
  name: 'filterTransactions',
})
export class FilterTransactionsPipe implements PipeTransform {
  transform(array: ITransaction[], filter: string = ''): ITransaction[] {
    if (!filter.trim()) {
        return array;
      }
    return array.filter(
        (transaction) => transaction.type === filter
      );
  }
}