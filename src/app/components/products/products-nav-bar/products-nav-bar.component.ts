import { Component, EventEmitter, Output } from '@angular/core';
import { ActionEvent, ProductActionsTypes } from '../../../state/product.state';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrl: './products-nav-bar.component.scss'
})
export class ProductsNavBarComponent {

  keyword!: string;

  @Output() productsEventEmiiter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  public OnGetAllproducts(): void {
    this.productsEventEmiiter.emit({type: ProductActionsTypes.GET_ALL_PRODUCTS});
  }

  public onGetSelectedProducts(): void {
    this.productsEventEmiiter.emit({type: ProductActionsTypes.GET_SELECTED_PRODUCTS});
  }

  public onGetAvailableProducts(): void {
    this.productsEventEmiiter.emit({type: ProductActionsTypes.GET_AVAILABLE_PRODUCTS});
  }

  public onGoToAddProduct(): void {
    this.productsEventEmiiter.emit({type: ProductActionsTypes.NEW_PRODUCT});
  }

  public onSearch(): void {
    this.productsEventEmiiter.emit({type: ProductActionsTypes.SEARCH_PRODUCTS, payload: this.keyword});
  }
}
