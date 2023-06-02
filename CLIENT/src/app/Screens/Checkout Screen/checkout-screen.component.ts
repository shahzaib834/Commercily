import { Component, Inject, OnInit } from '@angular/core';
import { ProductDataModel } from 'src/app/Models/Product.model';
import { ApiService } from 'src/app/api.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'home-screen',
  templateUrl: './checkout-screen.component.html',
})
export class CheckoutScreen implements OnInit {
  cart: Array<ProductDataModel> = []
  name: string = '';
  email: string = '';
  number: string = '';
  cardHolderName: string = '';
  cardNumbre: number= 0;
  expDate: Date = new Date();
  cvv: number = 0;

  constructor(private apiService: ApiService, @Inject(DOCUMENT) private document: Document) {}


  ngOnInit(): void {
    // @ts-ignore
      this.cart = JSON.parse(localStorage.getItem('cart'));
  }

  checkout() {
    this.apiService.postDataWithHeaders('payment/create-checkout-session', this.cart).subscribe((res) => {
      this.document.location.href = res.url;
    }, (err) => {
      console.log(err);
    })
  }

  updateName(event: any) {
    this.name = event.value;
  }

  updateEmail(event: any) {
    this.email = event.value;
  }

  updateNumber(event: any) {
    this.number = event.value;
  }

  updateCardHolderName(event: any) {
    this.cardHolderName = event.value;
  }

  updateCardNumber(event: any) {
    this.cardNumbre = event.value;
  }

  updateExpDate(event: any) {
    this.expDate = event.value;
  }

  updateCVV(event: any) {
    this.cvv = event.value;
  }
}
