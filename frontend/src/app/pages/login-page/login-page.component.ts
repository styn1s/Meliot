import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  emailError: string = '';
  passwordError: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  OnLoginButtonClicked(email: string, password: string) {
    if (!this.emailError && !this.passwordError) {
        this.authService.login(email, password).pipe(
            catchError((error) => {
                if (error.status === 400) {
                    alert("User not found");
                }
                else if (error.status === 404) {
                  alert("Incorrect password");
                }
                return EMPTY;
            })
        ).subscribe(
            (res: HttpResponse<any> | null) => {
                if (res && res.status === 200) {
                    // Successfully log in
                    this.router.navigate(['/']);
                    console.log(res);
                }
            }
        );
    }
  }

  isEmailError(): boolean {
    return !!this.emailError;
  }

  checkEmail(email: string) {
    if (email.trim() === "") {
      this.emailError = "";
    }
    else {
      if (!this.validateEmail(email)) {
        this.emailError = "Valid email required!";
      }
      else {
        this.emailError = "";
      }
    }
  }

  isPasswordError(): boolean {
    return !!this.passwordError;
  }

  checkPassword(password: string){
    if (password.trim() === "") {
      this.passwordError = "";
    }
    else {
      if (password.length < 8) {
        this.passwordError = "8 characters at least!";
      }
      else {
        this.passwordError = "";
      }
    }
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yandex\.ru|mail\.ru)$/;
    return emailRegex.test(email);
  }

}
