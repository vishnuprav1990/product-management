import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { ProductService } from '../_services/product.service';

const URL = 'http://localhost:3000/product/upload';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService
  ) { }

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image'
  });
  addForm: FormGroup;
  submitted = false;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [],
      fileUpload: ['', Validators.required],
      pname: ['', Validators.required],
      maxPrice: ['', Validators.required],
      minPrice: ['', Validators.required],
      buildTime: ['', Validators.required],
      buildCost: ['', Validators.required]
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      console.log('status:' + status);
      this.addForm.get('fileUpload').setValue(JSON.parse(status).fileUrl);
    };
  }

  onSubmit() {
    this.submitted = true;

    if (this.addForm.valid) {
      this.productService.addProduct(this.addForm.value).subscribe((data) => {
        console.log(data);
        this.router.navigate(['']);
      });
    }
  }

  // get the form short name to access the form fields
  get f() {
    return this.addForm.controls;
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.addForm.get('fileUpload').setValue(file);
      this.uploader.uploadAll();
    }
  }
}
