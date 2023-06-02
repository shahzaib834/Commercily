import { Component } from '@angular/core';
import { ProductService } from 'src/app/Screens/Home Screen/home-screen.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
})
export class SideBarComponent {

  constructor(private productService: ProductService) {}

  categories: Array<string> = ['Beauty', 'Groceries', 'Bold']
  categoriesSelectedArray: Array<string> = [];


  checkSelectedCategories(category: string): boolean {
    if (this.categoriesSelectedArray.includes(category)) {
      return true;
    }

    return false;
  }

  onCategoryClick(category: string) {
    if (this.categoriesSelectedArray.includes(category)) {
      this.categoriesSelectedArray.splice(this.categoriesSelectedArray.indexOf(category), 1);
      return;
    }

    this.categoriesSelectedArray.push(category);
  }

  filterCategory() {
    this.productService.categories.next(this.categoriesSelectedArray);
  }

  filterMinPrice(event: any) {
    this.productService.minPrice.next(Number(event.value));
  }

  filterMaxPrice(event: any) {
    this.productService.maxPrice.next(Number(event.value));
  }

}
