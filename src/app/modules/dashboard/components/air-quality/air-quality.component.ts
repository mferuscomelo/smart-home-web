import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { DBResponse } from 'src/app/shared/models/db.model';

@Component({
  selector: 'air-quality-card',
  templateUrl: './air-quality.component.html',
  styleUrls: ['./air-quality.component.scss'],
})
export class AirQualityComponent implements OnInit {
  airQualityList: Observable<DBResponse[]>;

  constructor(private db: AngularFireDatabase) {
    this.airQualityList = this.db.list<DBResponse>('humidity').valueChanges();
  }

  ngOnInit(): void {}
}
