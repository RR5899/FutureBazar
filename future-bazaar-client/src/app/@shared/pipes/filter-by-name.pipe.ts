import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName',
  standalone: true
})
export class FilterByNamePipe implements PipeTransform {

  transform(value: any[], searchString: string): any[] {
    if (!value || !searchString) {
      return value;
    }

    searchString = searchString.toLowerCase();
    return value.filter(item =>
      item?.name?.toLowerCase().includes(searchString)
      || item?.Name?.toLowerCase().includes(searchString)
    );
  }
}
