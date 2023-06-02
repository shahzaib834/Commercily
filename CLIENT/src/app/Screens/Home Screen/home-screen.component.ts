import { Component, OnInit } from '@angular/core';
import { ProductDataModel } from 'src/app/Models/Product.model';
import { ApiService } from 'src/app/api.service';
import { ProductService } from './home-screen.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'home-screen',
  templateUrl: './home-screen.component.html',
})
export class HomeScreen implements OnInit {
  constructor(
    private apiService: ApiService,
    private productService: ProductService
  ) {}

  products: Array<ProductDataModel> = [];
  keyword: string = '';
  categories: Array<string> = [];
  min: number = 0;
  max: number = 0;

  ngOnInit(): void {

    this.apiService.getData('products').subscribe((res) => {
      this.products = res.products;
    }, (err) => {
      console.log(err);
    })


    this.productService.keyword.pipe(debounceTime(1000)).subscribe((keyword) => {
      this.keyword = keyword;
      this.apiService.getData(`products?keyword=${this.keyword}&category=${this.categories}`).subscribe(
        (res) => {
          this.products = res.products;
        },
        (err) => {
          console.log('err', err);
        }
      );
    });

    this.productService.categories.subscribe((categories) => {
      this.categories = categories;
      this.apiService.getData(`products?keyword=${this.keyword}&category=${this.categories}`).subscribe(
        (res) => {
          this.products = res.products;
        },
        (err) => {
          console.log('err', err);
        }
      );
    });

    this.productService.minPrice.subscribe((min) => {
      this.min = min;
      this.apiService.getData(`products?keyword=${this.keyword}&category=${this.categories}&min=${this.min}&max=${this.max}`).subscribe(
        (res) => {
          this.products = res.products;
        },
        (err) => {
          console.log('err', err);
        }
      );
    });

    this.productService.maxPrice.subscribe((max) => {
      this.max = max;
      this.apiService.getData(`products?keyword=${this.keyword}&category=${this.categories}&min=${this.min}&max=${this.max}`).subscribe(
        (res) => {
          this.products = res.products;
        },
        (err) => {
          console.log('err', err);
        }
      );
    });
  }
}
