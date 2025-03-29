import { Component, OnInit } from '@angular/core';
import { EventDriverService } from '../../state/envent-driver.servicte';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  //#cette attribut contiendrai les numbre des produit selectionner au backend.
  selectedProductNumber!: number;

  constructor(private eventdriverservice: EventDriverService){}

  ngOnInit(): void {
    //# j'appel au service pour me founir le nombre de produit selectionner.
    this.eventdriverservice.getSelectedProductNumber().subscribe(
      (value: number) => this.selectedProductNumber = value
    );
  }

}
