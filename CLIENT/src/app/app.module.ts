import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeScreen } from './Screens/Home Screen/home-screen.component';
import { NavComponent } from './Components/Nav/navbar.component';
import { SideBarComponent } from './Components/Sidebar/sidebar.component';
import { AllProductsComponent } from './Components/AllProducts/all-products.component';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './Screens/Home Screen/home-screen.service';
import { AuthModalComponent } from './Components/Auth Modal/auth-modal.component';
import { ProductScreen } from './Screens/Product Screen/product-screen.component';
import { CheckoutScreen } from './Screens/Checkout Screen/checkout-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SideBarComponent,
    AuthModalComponent,
    HomeScreen,
    ProductScreen,
    CheckoutScreen,
    AllProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [ApiService, ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
