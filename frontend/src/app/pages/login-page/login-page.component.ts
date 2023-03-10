import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    localStorage.setItem('isLoggedIn','false');
  }

  onLoginButtonClicked(email: string, password: string) {
    this.authService.login(email, password).subscribe((res: HttpResponse<any>) => {
      if (res.status === 200) {
        // we have logged in successfully

        localStorage.setItem('isLoggedIn','true'); //login check

        this.router.navigate(['/lists'])
        .then(() => {
          window.location.reload();
        })
      }
      console.log(res);

    },
    (error) => {
      if (error.status === 400) {
        alert("Invalid login credentials.\nPlease try again!")
      }

    });
  }


}
