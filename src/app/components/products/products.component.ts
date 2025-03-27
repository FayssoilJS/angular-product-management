import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { AppDataState, DataStateEnum } from '../../state/product.state';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  dataState$!: Observable<AppDataState<Product[]>> ;
  readonly DataStateEnum = DataStateEnum; 

  keyword!: string;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ){

  }

  //Recuperer l'etat de donnnees de toutes les produits.
  public OnGetAllproducts(): void {
    this.dataState$ = this.productsService.getAllProducts();
  }

  //Recuperer l'etat de donnnees de toutes les produits selectionner.
  public onGetSelectedProducts(): void {
    this.dataState$ = this.productsService.getSelectedProducts();
  }

  //Recuperer l'etat de donnnees de toutes les produits disponible.
  public onGetAvailableProducts(): void {
    this.dataState$ = this.productsService.getAvailableProducts()
  }

  public onSearch(): void {

   /* if(this.keyword && this.keyword.trim()) {
      console.log("#keyword:",this.keyword);
      this.productsService.searchAProduct(this.keyword).subscribe(
        products => {
          if(products) {
            console.log("#produits rechercher:",products);
            this.products = products;
          }
        },
        error => {
          console.warn("#Error: ",error);
        }
      )
    }
    */
  }

  public onDeleteProduct(id: number | undefined): void {

    const isOk = confirm("Etes-vous sur de vouloire continuer?");

    if(id && isOk) {

      this.productsService.deleteProduct(id).subscribe( 
        res => {
          console.log("#Reponse de la suppression:", res);
          this.OnGetAllproducts();
        },
        error => {
          console.warn("#Error:",error);
        }

      )
    }
  }

  public onEditeProduct(id: number | undefined): void {
    if(id) {
      this.router.navigate(['edit-product'],{
        queryParams: {
          "id": id,
          "author": "malibo"
        }
      })
    }
  }

  public onAddProduct(): void {
    this.router.navigate(['add-product']);
  }
  
  
}
