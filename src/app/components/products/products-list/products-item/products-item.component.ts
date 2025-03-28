import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../models/product.model';
import { ActionEvent, ProductActionsTypes } from '../../../../state/product.state';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrl: './products-item.component.scss'
})
export class ProductsItemComponent {

  @Input() product!: Product;

  @Output() productsEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  public onDeleteProduct(id?: number): void {
    this.productsEventEmitter.emit({ type: ProductActionsTypes.DELETE_PRODUCT, payload: id});
  }

  public onGoToEditeProduct(id?: number): void {
    this.productsEventEmitter.emit({ type: ProductActionsTypes.EDIT_PRODUCT, payload: id});
  }

  public onSelect(product?: Product): void {
    this.productsEventEmitter.emit({ type: ProductActionsTypes.SELECT_PRODUCT, payload: product});
  }

}
