import { Injectable } from '@angular/core';
import {Item} from '../../item';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ElectronicsService {

  constructor() { }

  // getProducts(): Observable<Item[]>{
    
  // }

  // getProductDetails(): Observable<Item>{

  // }

  // addProduct(item: Item): Observable<Item>{

  // }

  // deleteProduct(id: number): Observable<any>{

  // }

  // updateProduct(item: Item): Observable<any>{

  // }
}
