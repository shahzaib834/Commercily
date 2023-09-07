import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDataModel } from 'src/app/Models/Product.model';
import { ApiService } from 'src/app/api.service';
import { ProductService } from '../Home Screen/home-screen.service';

@Component({
  selector: 'product-screen',
  templateUrl: './product-screen.component.html',
})
export class ProductScreen implements OnInit {
  id: unknown;
  myReview: string = '';
  //@ts-ignore
  product: ProductDataModel;
  itemsSelected: number = 0;
  likedByMe: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private productService: ProductService
  ) {}

  async getData() {
    this.apiService.getData(`products/${this.id}`).subscribe(
      (res) => {
        this.product = res.product;
        this.likedByMe = res.product.likes.some((elem: any) => {
          return elem.user === localStorage.getItem('id');
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });

    this.getData();
  }

  updateValue(event: any) {
    this.myReview = event.value;
  }

  onChangeCartItems(event: any) {
    this.itemsSelected = event.value;
  }

  likeProduct() {
    const email = localStorage.getItem('email');
    this.apiService
      .postDataWithHeaders(`products/${this.id}/like`, { email })
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  addReview() {
    const userId = localStorage.getItem('id');
    this.apiService
      .postDataWithHeaders(`products/${this.id}/review`, {
        userId,
        comment: this.myReview,
      })
      .subscribe(
        (res) => {
          if (res.success) {
            // Component not rerendering. need to check this later
            this.myReview = '';
            this.getData();
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  addToCart() {
    // Add items to cart
    // @ts-ignore
    let cart: Array[] = JSON.parse(localStorage.getItem('cart'));

    if (this.itemsSelected < 1) {
      this.itemsSelected = 1;
    }

    if (cart) {
      cart.push({ ...this.product, toOrder: this.itemsSelected });
      localStorage.setItem('cart', JSON.stringify(cart));
      return;
    }

    let cartToMake: Array<ProductDataModel> = [
      { ...this.product, toOrder: this.itemsSelected },
    ];
    localStorage.setItem('cart', JSON.stringify(cartToMake));
  }
}
