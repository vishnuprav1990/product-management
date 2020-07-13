import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FileSelectDirective } from 'ng2-file-upload';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AddProductComponent } from './add-product/add-product.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { SearchComponent } from './search/search.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { SortableColumnComponent } from './sortable-column/sortable-column.component';
import { TileComponent } from './tile/tile.component';
import { SortableTableDirective } from './_directives/sort-table.directive';
import { ProductService } from './_services/product.service';
import { SortService } from './_services/sort.service';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    AppComponent,
    ListProductsComponent,
    AddProductComponent,
    EditProductComponent,
    FileSelectDirective,
    SearchComponent,
    ShoppingComponent,
    TileComponent,
    CategoryComponent,
    SortableColumnComponent,
    SortableTableDirective,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [ProductService, SortService],
  bootstrap: [AppComponent]
})
export class AppModule { }
