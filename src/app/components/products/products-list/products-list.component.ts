import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from '../../../state/product.state';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {

  @Input() products$!: Observable<AppDataState<Product[]>>

  readonly DataStateEnum = DataStateEnum;

  @Output() productsEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  public onDeleteProduct(id: number | undefined):  void {
    this.productsEventEmitter.emit({ type: ProductActionsTypes.DELETE_PRODUCT, payload: id });
  }
  public onGoToEditeProduct(id: number | undefined): void {
    this.productsEventEmitter.emit({ type: ProductActionsTypes.EDIT_PRODUCT, payload: id });
  }

  public onSelect(product: Product): void {
    this.productsEventEmitter.emit({ type: ProductActionsTypes.SELECT_PRODUCT, payload: product });
  }

  public onActionEvent($event: ActionEvent): void {
    //#Il seront traiter dans le ParentComponent.
    this.productsEventEmitter.emit($event);
  }

}
