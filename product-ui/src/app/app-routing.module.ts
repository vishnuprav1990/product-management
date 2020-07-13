import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { ShoppingComponent } from './shopping/shopping.component';

const routes: Routes = [
  { path: 'shopping', component: ShoppingComponent},
  { path: 'category', component: CategoryComponent},
  { path: 'cart', component: CartComponent},
  { path: '', component: ListProductsComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
