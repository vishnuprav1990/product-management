import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProductModel } from '../_models/ProductModel';
import { ProductService } from '../_services/product.service';
import { CategoryModel } from './../_models/CategoryModel';
import { CategoryService } from './../_services/category.service';

const URL = 'http://localhost:3000/product/upload';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: ProductModel;
  editForm: FormGroup;
  submitted = false;
  imageUrl: String;
  list = [];
  @Input()
  path: String;
  @Input()
  modalRef: BsModalRef;
  @Input()
  productList: ProductModel[];
  rawMaterials: FormArray;
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image'
  });
  categories: CategoryModel[];

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService,
    private router: Router, private productService: ProductService) { }


  ngOnInit() {
    console.log(this.path);
    const productId = localStorage.getItem('productId');
    if (this.path === 'edit') {
      if (!productId) {
        alert('Something wrong!');
        this.router.navigate(['']);
        return;
      }
    }

    this.editForm = this.formBuilder.group({
      _id: [],
      fileUpload: ['', Validators.required],
      pname: ['', Validators.required],
      categoryId: ['', Validators.required],
      maxPrice: ['', Validators.required],
      minPrice: ['', Validators.required],
      buildTime: ['', Validators.required],
      buildCost: ['', Validators.required],
      rawMaterials: this.formBuilder.array([])
    });

    if (this.path === 'edit') {
      this.productService.getProductById(productId).subscribe(data => {
        console.log(data);
        this.imageUrl = data.imageUrl;
        this.editForm.patchValue(data); // Don't use editForm.setValue() as it will throw console error
        if (data.categoryId) {
          this.editForm.get('categoryId').patchValue(data.categoryId._id);
        }
        if (data.rawMaterials) {
          for (let index = 0; index < data.rawMaterials.length; index++) {
            this.addRawMaterial();
          }
          this.editForm.get('rawMaterials').patchValue(data.rawMaterials);
        }
        if (this.imageUrl) {
          this.editForm.get('fileUpload').setValue(this.imageUrl);
        }
      });
    }

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      console.log('status:' + status);
      this.imageUrl = JSON.parse(status).fileUrl;
      this.editForm.get('fileUpload').setValue(JSON.parse(status).fileUrl);
    };
    this.getAllCategories();
  }

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.editForm.valid) {
      if (this.path === 'edit') {
        this.productService.updateProduct(this.editForm.value)
          .subscribe(data => {
            console.log(data);
            this.router.navigate(['']);
          });
      }
      if (this.path === 'add') {
        this.productService.addProduct(this.editForm.value).subscribe((data) => {
          console.log(data);
          this.router.navigate(['']);
        });
      }
      this.modalRef.hide();
    }
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.editForm.get('fileUpload').setValue(file);
      this.uploader.uploadAll();
    }
  }

  addRawMaterial(index?: number) {
    this.rawMaterials = this.editForm.get('rawMaterials') as FormArray;
    if (index) {
      this.rawMaterials.insert(index, this.createItem());
    } else {
      this.rawMaterials.push(this.createItem());
    }
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      item: ['', Validators.required],
      count: ['', Validators.required]
    });
  }

  removeItem(index: number) {
    this.rawMaterials = this.editForm.get('rawMaterials') as FormArray;
    this.rawMaterials.removeAt(index);
  }
}
