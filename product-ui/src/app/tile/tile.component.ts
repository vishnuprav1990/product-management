import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from '../_models/ProductModel';
import { CartModel } from './../_models/CartModel';
import { CartService } from './../_services/cart.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  @Input()
  product: ProductModel;
  constructor(private cartService :CartService) { }

  ngOnInit() {
  }

  addToCart(){
    const item = new CartModel(this.product._id, undefined);
    this.cartService.addCartItem(item).subscribe(arg => console.log(arg));
    
  }
}
