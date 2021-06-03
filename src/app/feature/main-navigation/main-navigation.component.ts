import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit {
  name: any = "";

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(){
    this.name = sessionStorage.getItem('loginName');
  }

  logOut(){
    this.loginService.logoutUser();
    this.router.navigate(['login']);
  }

}
