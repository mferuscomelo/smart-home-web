import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { last } from 'rxjs/operators';
import { WeatherService } from 'src/app/core/services/weather.service';
import { DBResponse } from 'src/app/shared/models/db.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  temperatureList: Observable<DBResponse[]>;
  humidityList: Observable<DBResponse[]>;
  notificationsList: Observable<DBResponse[]>;

  constructor(
    private db: AngularFireDatabase,
    public weatherService: WeatherService
  ) {
    this.temperatureList = this.db
      .list<DBResponse>('temperature')
      .valueChanges();

    this.humidityList = this.db.list<DBResponse>('humidity').valueChanges();

    this.notificationsList = this.db
      .list<DBResponse>('notifications')
      .valueChanges();

    // this.weatherService.getCurrentWeather();
    // setInterval(this.weatherService.getWeather, 3600000);
  }

  ngOnInit(): void {}
}
