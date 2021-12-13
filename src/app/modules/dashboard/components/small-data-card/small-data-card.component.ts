import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DBResponse } from 'src/app/shared/models/db.model';

@Component({
  selector: 'small-data-card',
  templateUrl: './small-data-card.component.html',
  styleUrls: ['./small-data-card.component.scss'],
})
export class SmallDataCardComponent implements OnInit {
  @Input() title: string = '';
  @Input() className: string = '';
  @Input() iconName: string = '';
  @Input() dataList: Observable<DBResponse[]> | undefined;
  @Input() indicateStatus: boolean = false;
  @Input() selected: boolean = false;

  status: string = '';
  lastItem: DBResponse | undefined;

  constructor() {}

  ngOnInit(): void {
    this.dataList?.subscribe((data) => {
      this.lastItem = data.slice(-1)[0];

      const value = parseInt(this.lastItem.value);

      if (value > 70) {
        this.status = 'red';
      } else if (value > 60) {
        this.status = 'yellow';
      } else {
        this.status = 'green';
      }
    });
  }
}
