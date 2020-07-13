import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../_models/ProductModel';
import { ProductService } from '../_services/product.service';
import { CategoryModel } from './../_models/CategoryModel';
import { CategoryService } from './../_services/category.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  products: ProductModel[];
  initList: ProductModel[];
  categories: CategoryModel[];

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.getAllProducts();
    this.getAllCategories();
    }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }
  
  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      this.initList = data;
    });
  }

  captureResult(event) {
    this.products = JSON.parse(event);
  }
}
