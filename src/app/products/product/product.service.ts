import { Injectable } from "@angular/core";
import { Product } from "./product";
import {HttpClient} from '@angular/common/http'

@Injectable({
providedIn:'root'
})

export class ProductService{
    private getURL = "";
    constructor(private http: HttpClient){}
    getProducts(){
        return this.http.get<Product[]>(this.getURL)
    }

}

