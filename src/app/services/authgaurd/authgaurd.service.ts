import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthgaurdService implements CanActivate {

  constructor(private router:Router, private loginService: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean|UrlTree {

    if (!this.loginService.isUserLoggedIn()) {

    this.router.navigate(["login"]);
    return false;

    //var urlTree = this.router.createUrlTree(['login']);
    //return urlTree;
    } 

    return true;
  }
}
