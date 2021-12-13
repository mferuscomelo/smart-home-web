import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { DBResponse } from 'src/app/shared/models/db.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  temperatureList: Observable<DBResponse[]>;
  airQualityList: Observable<DBResponse[]>;
  chartData: Observable<DBResponse[]>;
  chartTitle: string;
  aqSelected: boolean = true;
  tempSelected: boolean = false;

  constructor(private db: AngularFireDatabase) {
    this.temperatureList = this.db
      .list<DBResponse>('temperature')
      .valueChanges();

    this.airQualityList = this.db
      .list<DBResponse>('air_quality')
      .valueChanges();

    this.chartData = this.airQualityList;
    this.chartTitle = 'Air Quality';
  }

  ngOnInit(): void {}

  selectAirQualityChart() {
    this.aqSelected = true;
    this.tempSelected = false;
    this.chartData = this.airQualityList;
  }

  selectTemperatureChart() {
    this.aqSelected = false;
    this.tempSelected = true;
    this.chartData = this.temperatureList;
  }
}
