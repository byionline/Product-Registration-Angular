import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  // Get All Products
  getProducts() {
    return this.http.get('/server/api/v1/products');
  }
  // Get Product By Id i.e single product
  getProduct(id: number) {
    return this.http.get('/server/api/v1/products/' + id);
  }
  // Add Product
  createProduct(product) {
    const body = JSON.stringify(product);
    return this.http.post('/server/api/v1/products', body, httpOptions);
  }
}
