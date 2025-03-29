import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from '../../state/product.state';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { EventDriverService } from '../../state/envent-driver.servicte';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  products$!: Observable<AppDataState<Product[]>> ;

  cmptSelectedProducter: number = 0;
   
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private eventDriverService: EventDriverService
  ){}

  ngOnInit(): void {

    this.eventDriverService.sourceEventSubjectObservabla.subscribe( 
      ($event: ActionEvent) => {
        if($event) {
          this.onActionEvent($event);
        }
      }
    );

    //#On compte le nombre de produit selectionner.
    this.cmptSelectedProducterNumber();
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
        if(response) {
          console.log("%c#Reponse de la selection recu du backend:","color: green;",response);
          //#ici on av mettre a jour la valeur de numbre des produits selectionnés.
          //#si le produit retourner a true dans l'attribut selected, on increment la valeur du compter
          //sinon on decriment.
          console.log("#Reponse de la selection recu du backend:",this.cmptSelectedProducter);
          this.cmptSelectedProducter += response.selected ? 1 : -1;
          console.log("#Reponse de la selection recu du backend:",this.cmptSelectedProducter);
          //#je notifie le service concerner de cette modification.
          this.eventDriverService.setSelectedProductNumber(this.cmptSelectedProducter);
        } 
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

  cmptSelectedProducterNumber(): void {
    //#je recupere les nombre des produits selectionner au backer.
    this.productsService.getSelectedProducts().subscribe(
      (data: AppDataState<Product[]>) => {
        //# si la liste de produits selectionner est la, alors on compte les nombre de produit selectionner.
        if(data && data.data) {
          this.cmptSelectedProducter = data.data.length;
          //#on met a jour le service pour qu'il puis le partager a celui qui en aura besoin.
          this.eventDriverService.setSelectedProductNumber(this.cmptSelectedProducter);
        }
      }
    )
  }

  public onGoToAddProduct(): void {
    this.router.navigate(['add-product']);
  }
  
}
