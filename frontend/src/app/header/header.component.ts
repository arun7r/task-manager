import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { WebRequestService } from '../web-request.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private webService: WebRequestService) { }

  email:any;
  uname:any;
  isLoggedin:any;

  userId=localStorage.getItem('user-id');

  ngOnInit(): void {
    //this.email=res.email; //for getting email id of the user to display it on the task-view page
    this.webService.getUserEmail(this.userId!).subscribe((res: any) => {
    this.uname=res.email!.slice(0, res.email!.indexOf('@')); //slicing until character @
    this.email=res.email;
    })

    // this.router.events.subscribe(event => {
    //   if (event.constructor.name === "NavigationEnd") {
    //    this.isLoggedin = this.authService.isLoggedIn;
    //   }
    // })

    this.isLoggedin =  localStorage.getItem('isLoggedIn');

  }

  homePage(): void {
    this.router.navigate(['/lists'])
    .then(() => {
      window.location.reload();
    })
  }
  
  logOutBtn(): void {
    window.location.reload();

    this.authService.logout();
  }

}
