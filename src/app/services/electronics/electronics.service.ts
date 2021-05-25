import { Injectable } from '@angular/core';
import { Product } from '../../product';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ElectronicsService {

  constructor() { }

  // getProducts(): Observable<Product[]>{
  //   return of();
  // }

  getProductDetails(id: number): Observable<Product>{
    return of({
      "id": 1,
      "name": "Mouse",
      "description": "Dell mouse",
      "count": 10,
      "image": "No image found",
      "price": 450
    });
  }

  // addProduct(product: Product): Observable<Product>{

  // }

  // deleteProduct(id: number): Observable<any>{

  // }

  updateProduct(product: Product): Observable<any>{
    return of();
  }
}
