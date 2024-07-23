import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductInfo } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  getAllProducts: Observable<IProductInfo[]>;

  getProductById: (id: number) => Observable<IProductInfo>;

  baseUr = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) {
    const fetchProducts = http.get<IProductInfo[]>(`${this.baseUr}/products`);

    this.getAllProducts = fetchProducts;

    const fetchProductById = (id: number) =>
      http.get<IProductInfo>(`${this.baseUr}/products/${id}`);

    this.getProductById = fetchProductById;
  }
}
