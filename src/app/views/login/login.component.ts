import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

userName : any="";
password : any="";

  constructor(private loginService : LoginService , private router: Router,) { }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log(this.userName);
    console.log(this.password);
    this.loginService.loginUser(this.userName,this.password)
    .subscribe((res) => {
      if(res.success == true){
        console.log("Login Successfull");
        this.router.navigate(["dashboard"]);
      }
      else
      console.log("Login failed");
    })
  }

}
