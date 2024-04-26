import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {

  constructor(private authSercie: AuthService, private router: Router) { }

  OnSignUpButtonClicked(email: string, password: string){
    this.authSercie.signup(email, password).subscribe((res: HttpResponse<any>) => {
      if (res.status === 200) {
        console.log(res);
        this.router.navigate(['/']);
      }  
    });
  }

}
