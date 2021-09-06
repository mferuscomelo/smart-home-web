import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { last } from 'rxjs/operators';
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

  constructor(private db: AngularFireDatabase) {
    this.temperatureList = db.list<DBResponse>('temperature').valueChanges();
    this.humidityList = db.list<DBResponse>('humidity').valueChanges();
    this.notificationsList = db
      .list<DBResponse>('notifications')
      .valueChanges();
  }

  ngOnInit(): void {}
}
