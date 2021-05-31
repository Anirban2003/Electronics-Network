import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private productsUrl = "https://electronics-backend1.herokuapp.com";
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json'
    })
  };

  // Make this false when login implemented
  isLoggedIn: boolean = true;
  name!: string;


  constructor(private http: HttpClient) { }

  loginUser(email: string, password: string): Observable<any>{
    return this.http.post<any>(this.productsUrl+'/login-user', {"userName": email, "password": password}, this.httpOptions)
    .pipe(
      tap((res) => {
        if(res.success == true){
          this.isLoggedIn = true;
          this.name = res.name;
        }
        console.log(`Login verification successful`);
      }),
      catchError(this.handleError<any>('loginUser'))
    );
  }

  logoutUser(){
    this.isLoggedIn = false;
  }

  isUserLoggedIn(): boolean{
    return this.isLoggedIn;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
