import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';//import form builder then 
import {IProduct} from './product'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productFrom : FormGroup = this.fb.group({});
  products: IProduct[] = [];
  selectedProduct: string ='';
  // Product = new Product(); //Create data model that defines data passed from and to back-end server 
  constructor(private fb: FormBuilder) //inject form builder in constractor 
  { }//

  ngOnInit(): void { 
    
    // use instance to create our formgroup
  //  this.productFrom = this.fb.group({
  //   productName : '',
  //   productType : '',
  //   productCategory : '',
  //   subCategory : false,   
  //   ID : 0,
  //   password :'' ,
  //   deliveryFeesValue : 0,
  //   deliveryFeesPercent: 0
   //})

  }
  // save(){
  //   console.log(this.productFrom)
  // }

}
