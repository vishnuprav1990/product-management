import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../_models/ProductModel';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  baseurl = 'http://localhost:3000/';

  getAllProducts() {
    return this.http.get<ProductModel[]>(this.baseurl + 'Products');
  }

  getProductById(id: string) {
    return this.http.get<ProductModel>(this.baseurl + 'Products' + '/' + id);
  }

  addProduct(product: ProductModel) {
    return this.http.post(this.baseurl + 'Products', product, {
      reportProgress: true,
      observe: 'events',
    });
  }

  deleteProduct(id: string) {
    return this.http.delete(this.baseurl + 'Products' + '/' + id);
  }

  updateProduct(product: ProductModel) {
    return this.http.put(
      this.baseurl + 'Products' + '/' + product._id,
      product
    );
  }

  public async uploadFile(file: File): Promise<UploadResult> {
    const formData = new FormData();
    formData.append('file', file);
    const result = await this.http
      .post<ApiUploadResult>(
        this.baseurl + 'product/upload' ,
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
