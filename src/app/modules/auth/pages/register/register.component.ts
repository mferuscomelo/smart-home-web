import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    displayName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get displayName() {
    return this.registerForm.get('displayName')!;
  }
  get email() {
    return this.registerForm.get('email')!;
  }
  get password() {
    return this.registerForm.get('password')!;
  }

  errorMessage = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  async register() {
    if (this.registerForm.valid) {
      try {
        await this.authService.emailSignUp(
          this.displayName.value,
          this.email.value,
          this.password.value
        );
      } catch (error) {
        // TODO: improve messages
        switch (error.code) {
          case 'auth/invalid-email':
            this.errorMessage = 'Invalid Email';
            break;

          case 'auth/email-already-in-use':
            this.errorMessage = 'Account already exists';
            break;

          case 'auth/weak-password':
            this.errorMessage = 'Weak Password';
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
