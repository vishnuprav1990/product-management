import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartModel } from './../_models/CartModel';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {}

  baseurl = 'http://localhost:3000/';

  getAllCartItem() {
    return this.http.get<CartModel[]>(this.baseurl + 'cart');
  }

  addCartItem(category: CartModel) {
    return this.http.post(this.baseurl + 'cart', category);
  }

  deleteCartItem(id: string) {
    return this.http.delete(this.baseurl + 'cart' + '/' + id);
  }
}
