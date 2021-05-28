import { Injectable } from '@angular/core';
import { Product } from '../../product';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ElectronicsService {
  private productsUrl = "https://electronics-backend1.herokuapp.com";
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any>{
    return this.http.get<any>(`${this.productsUrl}/get-all-records`, this.httpOptions)
    .pipe(
      tap((val) => console.log("Fetched Products successfully")),
      catchError(this.handleError<any>('getProducts'))
    );
  }

  getProductDetails(id: number): Observable<any>{
    const url = `${this.productsUrl}/get-one-record/${id}`;
    return this.http.get<any>(url, this.httpOptions)
    .pipe(
      tap(_ => console.log("Fetched Product successfully")),
      catchError(this.handleError<any>(`getProduct id = ${id}`))
    );
  }

  addProduct(product: any): Observable<any>{
    return this.http.put<any>(this.productsUrl+'/add-new-record', product, this.httpOptions).pipe(
      tap(_ => console.log(`added new product successfully`)),
      catchError(this.handleError<any>('addProduct'))
    );
  }

  deleteProduct(id: number): Observable<any>{
    const url = `${this.productsUrl}/delete-one-record/${id}`;

    return this.http.delete(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }

  updateProduct(product: any): Observable<any>{
    return this.http.post(this.productsUrl+'/update-existing-record', product, this.httpOptions)
    .pipe(
      tap(_ => console.log(`Product updated successfully`)),
      catchError(this.handleError<any>('updateProduct'))
    );
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
