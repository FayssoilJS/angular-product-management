import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit {



  constructor(
    private location: Location,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.initializations();
  }
  
  private initializations(): void {
    //#Initialisation du formulaire d'ajout d'un produit.
    this.editFormInitializationFor();
  }

  private editFormInitializationFor(): void {
    
  }

  public onGoToBack(): void {
    this.location.back()
  }
}
