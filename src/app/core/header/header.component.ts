import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentDate = new Date();

  status: 'ok' | 'error' = 'ok';

  constructor(public authService: AuthService) {
    this.authService.user.subscribe((user) => {
      this.status = user?.devices?.every((x) => x.status == 'OK')
        ? 'ok'
        : 'error';
    });

    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  ngOnInit(): void {}
}
