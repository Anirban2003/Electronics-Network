import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  loginUser(email: string, password: string): boolean{
    if(email == "admin" && password == "admin"){
      return true;
    }
    else{
      return false;
    }
  }
}
