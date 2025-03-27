import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

const routes: Routes = [
  { 
    path: "", 
    component: HomeComponent
  },
  {
    path: "products", 
    component: ProductsComponent
  },
  {
    path: "add-product",
    component: AddProductComponent

  },
  {
    path: "edit-product",
    component: EditProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
