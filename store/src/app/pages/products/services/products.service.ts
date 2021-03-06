import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiURL = "http://localhost:3000/products";
  constructor(private http: HttpClient) { }

  //hacer una peticion Get a la API, devuelve un Observable
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]> (this.apiURL);
  }
  //hacer que cuando se vende la cantidad de stock se disminuya 
  updateStock(productId: number, stock:number):Observable<any>{
    const body= {"stock": stock};
    return this.http.patch<any>(`${this.apiURL}/${productId}`, body);
  }
}
