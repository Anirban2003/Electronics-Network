import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterCaps'
})
export class TextTransformPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let firstLetter = value[0].toUpperCase();
    let finalWord = firstLetter + value.substr(1,value.length-1);
    return finalWord;
  }

}
