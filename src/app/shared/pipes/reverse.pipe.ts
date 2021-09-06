import { Pipe, PipeTransform } from '@angular/core';
import { DBResponse } from '../models/db.model';

@Pipe({
  name: 'reverse',
})
export class ReversePipe implements PipeTransform {
  transform(
    list: DBResponse[] | null,
    ...args: unknown[]
  ): DBResponse[] | undefined {
    return list?.reverse();
  }
}
