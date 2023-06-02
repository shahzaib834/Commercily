import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductDataModel } from 'src/app/Models/Product.model';
import { ApiService } from 'src/app/api.service';

@Injectable()
export class ProductService {
  keyword: Subject<string> = new Subject();
  categories: Subject<Array<any>> = new Subject();
  minPrice: Subject<number> = new Subject();
  maxPrice: Subject<number> = new Subject();

  openModal: Subject<string> = new Subject();
  loggedInSuccesfull: Subject<string> = new Subject();

  constructor() {}
}
