import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CategoryModel } from '../_models/CategoryModel';
import * as Util from './../_helper/util';
import { CategoryService } from './../_services/category.service';

const URL = 'http://localhost:3000/product/upload';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  modalRef: BsModalRef;
  categories: CategoryModel[];
  category: CategoryModel;
  editForm: FormGroup;
  submitted = false;
  imageUrl: String;
  path: String;
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image'
  });
  actionMode: string;
  modalTitle: string;

  constructor(private modalService: BsModalService, private categoryService: CategoryService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.getAllCategories();
    console.log(this.path);
    const categoryId = localStorage.getItem('categoryId');
    if (this.path === 'edit') {
      if (!categoryId) {
        alert('Something wrong!');
        return;
      }
    }

    this.editForm = this.formBuilder.group({
      _id: [],
      fileUpload: ['', Validators.required],
      cname: ['', Validators.required],
    });

    if (this.path === 'edit') {
      this.categoryService.getCategoryById(categoryId).subscribe(data => {
        console.log(data);
        this.imageUrl = data.imageUrl;
        this.editForm.patchValue(data); // Don't use editForm.setValue() as it will throw console error
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
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }


  openModal(template: TemplateRef<any>, title: string, category?: CategoryModel) {
    this.actionMode = title;
    this.modalRef = this.modalService.show(template);
    if (title === 'add') {
      this.modalTitle = 'Add Category';
      this.imageUrl = '';
      this.editForm.reset();
    } else if (title === 'edit') {
      this.modalTitle = 'Edit Category';
      this.categoryService.getCategoryById(category._id).subscribe(data => {
        console.log(data);
        this.imageUrl = data.imageUrl;
        this.editForm.patchValue(data); // Don't use editForm.setValue() as it will throw console error
        if (this.imageUrl) {
          this.editForm.get('fileUpload').setValue(this.imageUrl);
        }
      });
    }
  }

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }

  onSubmit(action: String) {
    this.submitted = true;

    if (this.editForm.valid) {
      if (action === 'edit') {
        this.categoryService.updateCategory(this.editForm.value)
          .subscribe(data => {
            console.log(data);
          });
      }
      if (action === 'add') {
        this.categoryService.addCategory(this.editForm.value).subscribe((data) => {
          console.log(data);
        });
      }
      this.getAllCategories();
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

  deleteCategory(category: CategoryModel) {
    this.categoryService.deleteCategory(category._id).subscribe(data => {
      console.log(data);
      this.getAllCategories();
    });
  }

  onSorted(event) {
    this.categories = Util.sortArray(this.categories, event);
  }
}
