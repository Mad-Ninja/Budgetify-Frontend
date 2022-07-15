import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../models/categories';
import { ITransaction } from '../models/transactions';
@Pipe({
  name: 'searchCategories',
})
export class SearchCategoriesPipe implements PipeTransform {
  transform(array: ICategory[], search: string = ''): ICategory[] {
    if (!search.trim()) {
      return array;
    }
    return array.filter((category) => {
      return category.name.toLowerCase().includes(search.toLowerCase());
    });
  }
}
