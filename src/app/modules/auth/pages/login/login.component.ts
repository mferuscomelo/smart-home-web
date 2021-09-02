import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get email() {
    return this.loginForm.get('email')!;
  }
  get password() {
    return this.loginForm.get('password')!;
  }

  errorMessage = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  async login() {
    if (this.loginForm.valid) {
      try {
        await this.authService.emailSignIn(
          this.email.value,
          this.password.value
        );
      } catch (error) {
        // TODO: improve messages
        switch (error.code) {
          case 'auth/invalid-email':
            this.errorMessage = 'Invalid Email';
            break;

          case 'auth/user-disabled':
            this.errorMessage = 'Account has been disabled';
            break;

          case 'auth/user-not-found':
            // TODO: add link to registration
            this.errorMessage = 'Account does not exist';
            break;

          case 'auth/wrong-password':
            this.errorMessage = 'Invalid password';
            break;
        }
      }
    }
  }

  getErrorMessage(inputElement: AbstractControl) {
    if (inputElement.hasError('required')) {
      return 'This field is required';
    } else if (inputElement.hasError('email')) {
      return 'Not a valid email';
    } else {
      return '';
    }
  }
}
