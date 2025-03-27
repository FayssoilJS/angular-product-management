import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { FormGroup } from '@angular/forms';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  
  addProductForm!: FormGroup;

  constructor(
    private location: Location,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.initializaations();
  }
  
  private initializaations(): void {
    //#Initialisation du formulaire d'ajout d'un produit.
    this.addFormInitializationFor();
  }

  private addFormInitializationFor(): void {
    this.addProductForm = this.productsService.buildAddProductForm();
  }

  //#ajout du produit.
  public onAddProduct(): void {
    console.log("fffff");
    //#modal de confirmation.
    const isOk = confirm("Etes-vous sur de vouloire ajouter ce produit?");
    if(this.addProductForm && isOk) {
      const product = this.addProductForm.value as Product;
      console.log("Le produit a ajouter: ",product);
      this.productsService.addProduct(product).subscribe(
        response => console.log("#Reponse d'ajout d'un produit:",response),
        error => console.warn("#Error:",error)
      )
    }
  }

  public onGoToBack(): void {
    this.location.back()
  }

}
