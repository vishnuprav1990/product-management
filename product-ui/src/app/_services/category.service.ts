import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryModel } from './../_models/CategoryModel';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  baseurl = 'http://localhost:3000/';

  getAllCategories() {
    return this.http.get<CategoryModel[]>(this.baseurl + 'Categories');
  }

  getCategoryById(id: string) {
    return this.http.get<CategoryModel>(this.baseurl + 'Categories' + '/' + id);
  }

  addCategory(category: CategoryModel) {
    return this.http.post(this.baseurl + 'Categories', category, {
      reportProgress: true,
      observe: 'events',
    });
  }

  deleteCategory(id: string) {
    return this.http.delete(this.baseurl + 'Categories' + '/' + id);
  }

  updateCategory(category: CategoryModel) {
    return this.http.put(
      this.baseurl + 'Categories' + '/' + category._id,
      category
    );
  }

  public async uploadFile(file: File): Promise<UploadResult> {
    const formData = new FormData();
    formData.append('file', file);
    const result = await this.http
      .post<ApiUploadResult>(
        this.baseurl + 'category/upload' ,
        formData, // Send the File Blob as the POST body.
        {
          // NOTE: Because we are posting a Blob (File is a specialized Blob
          // object) as the POST body, we have to include the Content-Type
          // header. If we don't, the server will try to parse the body as
          // plain text.
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .toPromise();
    return {
      name: file.name,
      type: file.type,
      size: file.size,
      url: result.url,
    };
  }
}

interface ApiUploadResult {
  url: string;
}

export interface UploadResult {
  name: string;
  type: string;
  size: number;
  url: string;
}
