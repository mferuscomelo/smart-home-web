import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(async (params) => {
      const {
        mode,
        oobCode: actionCode,
        continueUrl = `${environment.url}/dashboard`,
        lang = 'en',
      } = params;

      // TODO: error handling

      switch (mode) {
        case 'resetPassword':
          await this.authService.handleResetPassword(actionCode, lang);
          console.log('Password reset');
          break;

        case 'recoverEmail':
          // TODO: give user option to reset password
          await this.authService.handleRecoverEmail(actionCode, lang);
          console.log('Email recovered');
          break;

        case 'verifyEmail':
          await this.authService.handleVerifyEmail(actionCode, lang);
          console.log('Email verified');
          break;
      }

      window.location.href = continueUrl;
    });
  }
}
