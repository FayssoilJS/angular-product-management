import { Component, EventEmitter, Output } from '@angular/core';
import { ActionEvent, ProductActionsTypes } from '../../../state/product.state';
import { EventDriverService } from '../../../state/envent-driver.servicte';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrl: './products-nav-bar.component.scss'
})
export class ProductsNavBarComponent {

  keyword!: string;

  constructor(private eventDriverService: EventDriverService){}

  public OnGetAllproducts(): void {
    this.eventDriverService.publishEvent({type: ProductActionsTypes.GET_ALL_PRODUCTS});
  }

  public onGetSelectedProducts(): void {
    this.eventDriverService.publishEvent({type: ProductActionsTypes.GET_SELECTED_PRODUCTS});
  }

  public onGetAvailableProducts(): void {
    this.eventDriverService.publishEvent({type: ProductActionsTypes.GET_AVAILABLE_PRODUCTS});
  }

  public onGoToAddProduct(): void {
    this.eventDriverService.publishEvent({type: ProductActionsTypes.NEW_PRODUCT});
  }

  public onSearch(): void {
    this.eventDriverService.publishEvent({type: ProductActionsTypes.SEARCH_PRODUCTS, payload: this.keyword});
  }
}
