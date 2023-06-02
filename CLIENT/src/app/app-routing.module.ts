import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreen } from './Screens/Home Screen/home-screen.component';
import { ProductScreen } from './Screens/Product Screen/product-screen.component';
import { CheckoutScreen } from './Screens/Checkout Screen/checkout-screen.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeScreen },
  { path: 'product/:id', component: ProductScreen },
  { path: 'checkout', component: CheckoutScreen },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
