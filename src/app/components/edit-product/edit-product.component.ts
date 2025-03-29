import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { AppDataState, DataStateEnum } from '../../state/product.state';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit {

  editProductForm!: FormGroup;
  product!: AppDataState<Product>

  readonly DataStateEnum = DataStateEnum

  constructor(
    private location: Location,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializations();
  }
  
  private initializations(): void {
    this.productInitialization();
  }

  private productInitialization(): void {
    //#recuperation des parametres dans l'url.
    const productId = this.route.snapshot.queryParams['id'] as number;
    if(!productId) {
      return;
    }

    //#recuperation du vehicule par son id.
    this.productsService.getProduct(productId).subscribe(
      {
        next: (value => {
          console.log("%c#Le State recu:","color: red;",value)
          this.product = value;
          if(value.data) {
            console.log("%c#Le State recu avec data:","color: green;",value)
            //#Initialisation du formulaire de modifiaction d'un produit.
            this.editFormInitialization();
          }
          
        })
      }
    );
  }

  private editFormInitialization(): void {
    this.editProductForm = this.productsService.buildProductForm();
    if(this.editProductForm) {
      this.editProductForm.get("name")?.setValue(this.product.data?.name);
      this.editProductForm.get("price")?.setValue(this.product.data?.price);
      this.editProductForm.get("quantity")?.setValue(this.product.data?.quantity);
      this.editProductForm.get("selected")?.setValue(this.product.data?.selected);
      this.editProductForm.get("available")?.setValue(this.product.data?.available);
      this.editProductForm.get("id")?.setValue(this.product.data?.id);
    }
  }

  public onEditProduct(): void {
    const product = this.editProductForm.value as Product
    console.log(product);
    const isOk = confirm("Etes-vous sur de vouloir continuer?");
    if(product && isOk) {

      this.productsService.editeProduct(product).subscribe(
        response => {
          console.log("%c#Response de modification d'un produit:","color: green;",response)
        },
        error => console.warn("#Error:",error)
      );
      this.onGoToBack();
    }
  }

  public onGoToBack(): void {
    this.location.back()
  }
}
