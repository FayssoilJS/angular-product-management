import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from '../../state/product.state';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  products$!: Observable<AppDataState<Product[]>> ;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ){

  }

  //Recuperer l'etat de donnnees de toutes les produits.
  public OnGetAllproducts(): void {
    this.products$ = this.productsService.getAllProducts();
  }

  //Recuperer l'etat de donnnees de toutes les produits selectionner.
  public onGetSelectedProducts(): void {
    this.products$ = this.productsService.getSelectedProducts();
  }

  //Recuperer l'etat de donnnees de toutes les produits disponible.
  public onGetAvailableProducts(): void {
    this.products$ = this.productsService.getAvailableProducts()
  }

  public onSearch( keyword: string): void {
    if(!keyword) {
      return;
    }
    
    this.products$ = this.productsService.searchAProduct(keyword);
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

  public onGoToEditeProduct(id: number | undefined): void {

    //#j'ai prefere mettre l'aid dans les parametres de l'url sinon on pouvais faire 
    // une route dynamique dans le fichire de routage.

    if(id) {
      this.router.navigate(['edit-product'],{
        queryParams: {
          "id": id,
          "author": "malibo"
        }
      })
    }
  }

  //#selectionner ou deselectionner un produit.

  public onSelect(product: Product): void {
    if(!product) {
      return;
    }
    product.selected = !product.selected;

    this.productsService.selectProduct(product).subscribe(
      response => {
        console.log("%c#Reponse de la selection recu du backend:","color: green;",response)
      },
      error => console.warn("#Error:",error)
    )
  }

  //#Cette méthode nous permet d'écouter les évenements et de les traités s'ils arrivent.
  public onActionEvent($event: ActionEvent): void {
    switch($event.type) {
      case ProductActionsTypes.GET_ALL_PRODUCTS: this.OnGetAllproducts();
      break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS: this.onGetSelectedProducts();
      break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS: this.onGetAvailableProducts();
      break;
      case ProductActionsTypes.NEW_PRODUCT: this.onGoToAddProduct();
      break;
      case ProductActionsTypes.SEARCH_PRODUCTS: this.onSearch($event.payload);
      break;
      case ProductActionsTypes.SELECT_PRODUCT: this.onSelect($event.payload);
      break;
      case ProductActionsTypes.DELETE_PRODUCT: this.onDeleteProduct($event.payload);
      break;
      case ProductActionsTypes.EDIT_PRODUCT: this.onGoToEditeProduct($event.payload);
      break;
    }
  }

  public onGoToAddProduct(): void {
    this.router.navigate(['add-product']);
  }
  
  
}
