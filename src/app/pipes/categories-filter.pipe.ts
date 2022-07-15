import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../models/categories';
import { ITransaction } from '../models/transactions';
@Pipe({
  name: 'filterCategories',
})
export class FilterCategoriesPipe implements PipeTransform {
  transform(array: ICategory[], filter: string = ''): ICategory[] {
    if (!filter.trim()) {
        return array;
      }
    return array.filter(
        (category) => category.type === filter
      );
  }
}