import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { DBResponse } from 'src/app/shared/models/db.model';

@Component({
  selector: 'notifications-card',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notificationsList: Observable<DBResponse[]>;

  constructor(private db: AngularFireDatabase) {
    this.notificationsList = this.db
      .list<DBResponse>('notifications')
      .valueChanges();
  }

  ngOnInit(): void {}
}
