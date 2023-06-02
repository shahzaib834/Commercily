import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDataModel } from 'src/app/Models/Product.model';
import { ProductService } from 'src/app/Screens/Home Screen/home-screen.service';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'allProducts',
  templateUrl: './all-products.component.html',
})
export class AllProductsComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService, private productService: ProductService) {}

  @Input() products: Array<ProductDataModel> = [];


  productPage(item: any) {
    this.router.navigate([`/product/${item._id}`]);
  }

  ngOnInit(): void {}

}
