import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { DBResponse } from 'src/app/shared/models/db.model';

@Component({
  selector: 'temperature-card',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss'],
})
export class TemperatureComponent implements OnInit {
  temperatureList: Observable<DBResponse[]>;

  constructor(private db: AngularFireDatabase) {
    this.temperatureList = this.db
      .list<DBResponse>('temperature')
      .valueChanges();
  }

  ngOnInit(): void {}
}
