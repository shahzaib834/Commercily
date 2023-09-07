import {
  Component,
  Injectable,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { ProductDataModel } from 'src/app/Models/Product.model';
import { ProductService } from 'src/app/Screens/Home Screen/home-screen.service';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'auth-modal',
  templateUrl: './auth-modal.component.html',
})
export class AuthModalComponent implements OnInit {
  constructor(
    private router: Router,
    private apiService: ApiService,
    private productService: ProductService
  ) {}

  isModalVisible: boolean = false;
  email: string = '';

  ngOnInit(): void {
    this.productService.openModal.subscribe((message) => {
      this.isModalVisible = !this.isModalVisible;
    });
  }

  updateValue(event: any) {
    this.email = event.value;
  }

  authUser() {
    this.apiService
      .postDataWithHeaders('users/login', { email: this.email })
      .subscribe(
        (res) => {
          if (res.success) {
            // save email to local storage
            localStorage.setItem('email', res.user.email);
            localStorage.setItem('id', res.user._id);
            this.productService.loggedInSuccesfull.next('true');
            // close modal
            this.isModalVisible = false;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
