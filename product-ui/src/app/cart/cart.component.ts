import { Component, OnInit } from '@angular/core';
import { CartModel } from './../_models/CartModel';
import { CartService } from './../_services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartModel[];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.getCartItems();
  }

  getCartItems(): void {
    this.cartService.getAllCartItem().subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
  }


}
