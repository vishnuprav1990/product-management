import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductModel } from '../_models/ProductModel';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input()
  initList: ProductModel[];
  @Output()
  productsResult = new EventEmitter();
  products: ProductModel[];
  constructor() { }

  ngOnInit() {
  }

  search(f: NgForm) {
    console.log(f.value);
    const searchTxt = f.value.search;
    if (searchTxt !== '') {
      this.products = this.initList.filter((product) => {
        if (product.pname.toLowerCase().search(searchTxt) > -1) {
          return product;
        }
      });
    } else {
      this.products = this.initList;
    }
    this.productsResult.emit(JSON.stringify(this.products));
  }
}
