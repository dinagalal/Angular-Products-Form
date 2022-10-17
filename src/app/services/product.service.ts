import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { Observable } from 'rxjs';

import { IProduct } from '../products/product/product.model';
import { PRODUCTS } from '../products/product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
products = PRODUCTS;

  constructor() { }

  // get the list of products
  getAllProduct() :  Observable<IProduct| any> {
    return of(this.products).pipe(delay(2000));
// return this.products
    
  }

  // get product by ID 
  getProductById(productId:number): Observable<IProduct| any> {
   const productItem = this.products.filter(product=> product.id === productId)[0]
   return of(productItem).pipe();

  }
  // Add new Product 
  addProduct(product:IProduct): Observable<IProduct| any>{
    const id = this.products.length + 1
    this.products.push({
      ...product,
      id
    });
    return of(this.products).pipe();
    
  }
  // Edit product 
  updateProduct(id:number, product:IProduct): Observable<IProduct[] | any>{

const productIndex = this.products.findIndex(
  item=> item.id === id
);

    this.products[productIndex] = {...product, id };

    return of(this.products).pipe(delay(1000));


  }

  // Delete Product 
  deleteProduct(id:number): Observable<any>{
    console.log("enter delete function")
    const productIndex = this.products.findIndex(
      item=> item.id === id
    );
    this.products.splice(productIndex,1);
    console.log("delete:",this.products)
    return of(this.products).pipe(delay(1000));
    
  }
}
