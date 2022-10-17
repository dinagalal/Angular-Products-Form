import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; //import form builder then
import { IProduct } from './product.model';
import { ProductService } from '../../services/product.service';
import {
  NgbModalRef,
  NgbModalOptions,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { map, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  newProductForm: FormGroup = this.fb.group({});
  products$!: Observable<IProduct | any>;
  selectedProductId: number | any;
  productSelect: string = '';
  selectedProduct: IProduct = new IProduct();
  loadingInProgress: boolean = false;
  modalInstant: NgbModalRef | any;
  modalRef: NgbModalRef | any;
  errormessage: string | any;
  addingNewProduct = false;
  actionType: string = '';

  @ViewChild('content') content: any;
  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    centered: true,
    scrollable: false,
    size: 'md',
  };

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private modalService: NgbModal
  ) {} //

  getProducts() {
    this.products$ = this.productService.getAllProduct().pipe(
      map((products) =>
        products.map((product: any) => ({
          text: `${product.productName}`,
          value: product.id,
        }))
      )
    );
  }
  chooseProduct() {
    if (this.selectedProductId) {
      console.log('values', this.newProductForm.value);
      this.loadingInProgress = true;
      this.productService
        .getProductById(this.selectedProductId)
        .subscribe((res) => (this.selectedProduct = res));

      if (this.selectedProductId) {
        this.addingNewProduct = true;
        this.addNewProductFormInit();
        this.loadingInProgress = false;
      } else {
        this.newProductForm.reset();
      }
    }
  }
  addNewProductFormInit() {
    this.newProductForm = this.fb.group({
      productName: [this.selectedProduct.productName, Validators.required],
      productType: [this.selectedProduct.productType, Validators.required],
      productCategory: [
        this.selectedProduct.productCategory,
        Validators.required,
      ],
      referenceId: [this.selectedProduct.referenceId, Validators.required],
      password: [
        '',
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,}'
        ),
      ],
      deliveryFeesValue: [
        this.selectedProduct.deliveryFeesValue,
        Validators.required,
      ],
      deliveryFeesPercent: [
        this.selectedProduct.deliveryFeesPercent,
        Validators.required,
      ],
    });
  }
  AddNewProduct() {
    this.selectedProductId = 0;
    this.addingNewProduct = true;
    this.selectedProduct = new IProduct();
    this.addNewProductFormInit();
  }

  addUpdateProduct() {
    if (this.newProductForm.valid) {
      this.actionType = 'save';
      const newProduct: IProduct = this.newProductForm.value;
      if (!this.selectedProductId) {
        this.productService
          .addProduct(newProduct)
          .subscribe((response: any) => {
            this.selectedProductId = response.length;
            this.products$ = of(response);
            this.products$ = this.products$.pipe(
              map((products) =>
                products.map((product: any) => ({
                  text: `${product.productName}`,
                  value: product.id,
                }))
              )
            );
          });
        this.closeModal();
      } else {
        console.log('update product', newProduct);
        const productId = this.selectedProductId;

        this.productService
          .updateProduct(productId, newProduct)
          .subscribe((response: any) => {
            this.products$ = of(response);
            this.products$ = this.products$.pipe(
              map((products) =>
                products.map((product: any) => ({
                  text: `${product.productName}`,
                  value: product.id,
                }))
              )
            );
          });
        this.closeModal();
      }
    } else {
      this.onSaveCompelte();
    }
  }
  deleteProduct() {
    this.actionType = 'delete';
    const selectedId = this.selectedProductId;
    console.log('deletfunction', selectedId);
    this.productService
      .deleteProduct(selectedId)
      .subscribe((response: IProduct) => {
        this.selectedProductId = null;
        this.products$ = of(response);
        this.products$ = this.products$.pipe(
          map((products) =>
            products.map((product: any) => ({
              text: `${product.productName}`,
              value: product.id,
            }))
          )
        );
        this.addingNewProduct = false;
        this.newProductForm.reset();
     
        this.closeModal();
      });
  }

  onSaveCompelte() {
    console.log('not valid');
    this.newProductForm.reset();
  }

  ngOnInit() {
    this.getProducts();
    this.newProductForm = this.fb.group({
      txtproductName: ['', Validators.required],
      productType: '',
      productCategory: { value: 'n/a', disabled: true },
      txtReferenceID: '',
      password: '',
      deliveryFees: 0,
      percentDeliveryFees: 0,
    });
  }
  save() {
    console.log(this.newProductForm);
  }

  openModal(content: any) {
    this.modalInstant = this.modalService.open(content, this.ngbModalOptions);
  }

  closeModal() {
    this.modalInstant.close();
  }
}
