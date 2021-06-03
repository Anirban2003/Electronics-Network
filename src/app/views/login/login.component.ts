import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { AppDialogComponent } from 'src/app/feature/app-dialog/app-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: any = "";
  password: any = "";
  loader: boolean = false;

  constructor(private loginService: LoginService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.loader = true;
    this.loginService.loginUser(this.userName, this.password)
      .subscribe((res) => {
        if (res.success == true) {
          this.loader = false;
          console.log("Login Successfull");
          this.router.navigate(["home"]);
        }
        else {
          this.loader = false;
          console.log("Login failed");
          const dialogRef = this.dialog.open(AppDialogComponent, {
            data: {
              title: "Incorrect username or password",
              secondaryButtonRequired: false,
              primaryButtonText: "OK"
            }
          });
          // dialogRef.afterClosed().subscribe(() => {
          //   this.router.navigate(["dashboard"]);
          // });

        }
      }
    )
  }
}
