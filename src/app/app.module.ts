import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoaderComponent } from '././loader/loader.component';
import { AppComponent } from './app.component';
import { ProductComponent } from './products/product/product.component';
import { ConfrimationModalComponent } from './components/confrimation-modal-component/confrimation-modal-component.component';


@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    ProductComponent,
    ConfrimationModalComponent,
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
