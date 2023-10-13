import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private url = 'http://localhost:8080/api/v1/products';
  
  constructor( private http: HttpClient) { }
  
  public getProducts(): Observable<any> {
    return this.http.get<any>(this.url);
  }
  
  public getProduct(id: number): Observable<any> {
    return this.http.get<any>(this.url + '/' + id);
  }
  
  createProduct(product: any) {
    return this.http.post<any>(this.url, product);
  }

  public deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  public updateProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, product);
  }
}
