import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  constructor(private authSercie: AuthService, private router: Router) { }

  OnLoginButtonClicked(email: string, password: string){
    this.authSercie.login(email, password).subscribe((res: HttpResponse<any>) => {
      if (res.status === 200) {
        console.log(res);
        this.router.navigate(['/']);
      }  
    });
  }

}
