import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductModel } from '../_models/ProductModel';
import { ProductService } from '../_services/product.service';
import * as Util from './../_helper/util';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  products: ProductModel[];
  initList: ProductModel[];
  modalRef: BsModalRef;
  confirmModalRef: BsModalRef;
  modalTitle: string;
  actionMode: string;
  deleteItem: ProductModel;

  constructor(private productService: ProductService, private router: Router, private modalService: BsModalService) { }

  ngOnInit() {
    this.getAllProducts();
    this.close();
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      this.initList = data;
    });
  }

  deleteProduct(product: ProductModel, template: TemplateRef<any>) {
    this.deleteItem = product;
    this.openConfirmmodal(template);
  }

  captureResult(event) {
    this.products = JSON.parse(event);
  }

  openModal(template: TemplateRef<any>, title: string, product?: ProductModel) {
    this.actionMode = title;
    this.modalRef = this.modalService.show(template);
    if (title === 'add') {
      this.modalTitle = 'Add Product';
    } else if (title === 'edit') {
      this.modalTitle = 'Edit Product';
      localStorage.removeItem('productId');
      localStorage.setItem('productId', product._id);
    }
  }

  close() {
    this.modalService.onHidden.subscribe((reason: string) => {
      this.getAllProducts();
    });
  }

  onSorted(event) {
    this.products = Util.sortArray(this.products, event);
  }

  openConfirmmodal(template: TemplateRef<any>) {
    this.confirmModalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.productService.deleteProduct(this.deleteItem._id).subscribe(data => {
      console.log(data);
      this.getAllProducts();
    });
    this.confirmModalRef.hide();
  }

  decline(): void {
    this.deleteItem = undefined;
    this.confirmModalRef.hide();
  }
}
