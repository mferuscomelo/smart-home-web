import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

import { last } from 'rxjs/operators';
import { DBResponse } from '../models/db.model';

@Pipe({
  name: 'getLastItem',
})
export class GetLastItemPipe implements PipeTransform {
  transform(list: DBResponse[] | null): DBResponse | undefined {
    return list?.slice(-1)[0];
  }
}
