import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { 
    localStorage.setItem('isLoggedIn','false');
  }

  ngOnInit(): void {
  }

  
  onSignupButtonClicked(email: string, password: string) {
    this.authService.signup(email, password).subscribe((res: HttpResponse<any>) => {
      console.log(res);

      localStorage.setItem('isLoggedIn','true'); //login check
      
      this.router.navigate(['/lists'])
      .then(() => {
        window.location.reload();
      })
    },
    (error) => {
      if (error.status === 400) {
        alert("Please make sure the entered details are correct.\nPassword must atleast contain 8 characters.")
      }
    });
  }
}
