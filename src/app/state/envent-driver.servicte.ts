import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { ActionEvent } from "./product.state";

@Injectable({
    providedIn: 'root'
})

export class EventDriverService {

    private sourceEventSubject: Subject<ActionEvent> = new Subject<ActionEvent>();
    sourceEventSubjectObservabla: Observable<ActionEvent> = this.sourceEventSubject.asObservable();

    private selectedProductNumber: BehaviorSubject<number> = new BehaviorSubject<number>(0); 

    publishEvent($event: ActionEvent) {
        this.sourceEventSubject.next($event);
        console.log("%c#On a une nouvelle action en publication: ","color: green;",$event);
    }

    setSelectedProductNumber(number: number): void {
        this.selectedProductNumber.next(number);
    }

    getSelectedProductNumber(): Observable<number>{
        return this.selectedProductNumber.asObservable();
    }
}