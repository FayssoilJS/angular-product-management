import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from '../../../state/product.state';
import { Product } from '../../../models/product.model';
import { EventDriverService } from '../../../state/envent-driver.servicte';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {

  @Input() products$!: Observable<AppDataState<Product[]>>

  readonly DataStateEnum = DataStateEnum;

  constructor(private eventDriverService: EventDriverService){}

  public onDeleteProduct(id: number | undefined):  void {
    this.eventDriverService.publishEvent({ type: ProductActionsTypes.DELETE_PRODUCT, payload: id });

  }
  public onGoToEditeProduct(id: number | undefined): void {
    this.eventDriverService.publishEvent({ type: ProductActionsTypes.EDIT_PRODUCT, payload: id });
  }

  public onSelect(product: Product): void {
    this.eventDriverService.publishEvent({ type: ProductActionsTypes.SELECT_PRODUCT, payload: product });
  }

}
