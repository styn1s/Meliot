import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent{

  emailError: string = '';
  passwordError: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  OnSignUpButtonClicked(email: string, password: string){
    
    if (!this.emailError && !this.passwordError){
      // If no errors, proceed with signup
      this.authService.signup(email, password).subscribe((res: HttpResponse<any>) => {
      if (res.status === 200) {
        console.log(res);
        this.router.navigate(['/']);
      }
    });
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
