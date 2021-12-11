import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DBResponse } from 'src/app/shared/models/db.model';

@Component({
  selector: 'small-data-card',
  templateUrl: './small-data-card.component.html',
  styleUrls: ['./small-data-card.component.scss'],
})
export class SmallDataCardComponent implements OnInit {
  @Input() title!: string;
  @Input() className!: string;
  @Input() iconName!: string;
  @Input() dataList!: Observable<DBResponse[]>;

  constructor() {}

  ngOnInit(): void {}
}
