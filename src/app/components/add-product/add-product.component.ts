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
    this.addFormInitialization();
  }

  private addFormInitialization(): void {
    this.addProductForm = this.productsService.buildProductForm();
  }

  //#ajout du produit.
  public onAddProduct(): void {

    //#modal de confirmation.
    const isOk = confirm("Etes-vous sur de vouloire ajouter ce produit?");

    if(this.addProductForm && isOk) {

      const product = this.addProductForm.value as Product;

      console.log("Le produit a ajouter: ",product);

      this.productsService.addProduct(product).subscribe(
        response => console.log("#Reponse d'ajout d'un produit:",response),
        error => console.warn("#Error:",error)
      )

      //#effacer les donner du formulaire apres l'ajout du produt.
      this.resetFields();
    }
  }

  public onGoToBack(): void {
    this.location.back()
  }

  public resetFields(): void {
    this.addProductForm.get('name')?.setValue("");
    this.addProductForm.get('price')?.setValue("");
    this.addProductForm.get('quantity')?.setValue("");
    this.addProductForm.get('selected')?.setValue(false);
    this.addProductForm.get('available')?.setValue(false);
  }

}
