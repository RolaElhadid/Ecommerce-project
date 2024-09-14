import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfProducts : any[] , word : string): any[] {
    return arrayOfProducts.filter( (item)=> item.title.toLowerCase().includes(word.toLowerCase()));
  }

}
