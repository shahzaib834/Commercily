import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Screens/Home Screen/home-screen.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
})
export class NavComponent implements OnInit {
  query: string = '';
  loggedInSuccesfull: boolean = localStorage.getItem('email') && localStorage.getItem('email') != null ? true : false;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.loggedInSuccesfull.subscribe((res) => {
      this.loggedInSuccesfull = true;
    }, (err) => {
      console.log(err);
    });
  }

  fetchProducts(event: string) {
    this.productService.keyword.next(event);
  }

  toggleAuthModal() {
    this.productService.openModal.next('change');
  }

}
