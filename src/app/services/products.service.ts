import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Product } from "../models/product.model";
import { catchError, map, Observable, of, startWith } from "rxjs";
import { environment } from "../../environment/environment";
import { AppDataState, DataStateEnum } from "../state/product.state";
import { FormBuilder, FormGroup } from "@angular/forms";

@Injectable(
    {
        providedIn: "root"
    }
)
export class ProductsService {

    private httpHeaders: HttpHeaders;
    
    constructor( 
        private httpClient: HttpClient,
        private formBuilder: FormBuilder
    ) {
        this.httpHeaders = new HttpHeaders(
            {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        );
    }

    getAllProducts(): Observable<AppDataState<Product[]>>{
        //#construction de options de la requete.
        const options = { 
            headers: this.httpHeaders
        };
        console.log("# les options d'en-tete headers:",this.httpHeaders);

        const url= environment.host+"products";

        return this.httpClient.get<Product[]>(url, options).pipe(
            map( products => ({ dataState: DataStateEnum.LOADED, data: products})),
            startWith({dataState: DataStateEnum.LOADING}),
            catchError(error => of({dataState: DataStateEnum.ERROR, errorMessage: error.message}))
        );
    }

    getSelectedProducts(): Observable<AppDataState<Product[]>> {
        //#construire les parametre de la requete.
        const params = new HttpParams().set("selected","true");

        //#options de la requete.
        const options = {
            headers: this.httpHeaders,
            params: params
        }

        const url= environment.host+"products";

        return this.httpClient.get<Product[]>(url, options).pipe(
            map( products => ({ dataState: DataStateEnum.LOADED, data: products})),
            startWith({dataState: DataStateEnum.LOADING}),
            catchError(error => of({dataState: DataStateEnum.ERROR, errorMessage: error.message}))
        )
    }

    getAvailableProducts(): Observable<AppDataState<Product[]>> {
        //#parametre d'url.
        const params = new HttpParams().set("available","true");

        //#options de la requete.
        const options = {
            headers: this.httpHeaders,
            params: params
        }

        const url= environment.host+"products";

        return this.httpClient.get<Product[]>(url, options).pipe(
            map( products => ({ dataState: DataStateEnum.LOADED, data: products})),
            startWith({dataState: DataStateEnum.LOADING}),
            catchError(error => of({dataState: DataStateEnum.ERROR, errorMessage: error.message}))
        )
    }

    getProduct(id: number): Observable<AppDataState<Product>> {

        //#options de la requete.
        const options = {
            headers: this.httpHeaders
        }

        const url= environment.host+"products/"+id;

        return this.httpClient.get<Product>(url, options).pipe(
            map( product => ({ dataState: DataStateEnum.LOADED, data: product})),
            startWith({dataState: DataStateEnum.LOADING}),
            catchError(error => of({dataState: DataStateEnum.ERROR, errorMessage: error.message}))
        )
    }

    //#:TO DO: A revoire la documentation de json-server
    searchAProduct(keyword: string): Observable<AppDataState<Product[]>> {
        if (!keyword.trim()) {
            return of(
                { 
                    dataState: DataStateEnum.ERROR, 
                    errorMessage: "Saisir un mot cle!"
                }
            );
        }
    
        const params = new HttpParams().set("q", keyword.trim());
    
        const options = {
            headers: this.httpHeaders,
            params: params
        };
    
        console.log(" URL:", `${environment.host}products`);
        console.log("Params:", params.toString());

        const url = `${environment.host}products`;

        return this.httpClient.get<Product[]>(url, options).pipe(
            map( products => ({ dataState: DataStateEnum.LOADED, data: products})),
            startWith({dataState: DataStateEnum.LOADING}),
            catchError(error => of({dataState: DataStateEnum.ERROR, errorMessage: error.message}))
        );
    }

    deleteProduct(id: number): Observable<Product>{
        const options = {
            headers: this.httpHeaders
        }
        const url = `${environment.host}products/${id}`;
        return this.httpClient.delete<Product>(url, options);
    }

    editeProduct(id: number){

        const options = {
            headers: this.httpHeaders
        };

        const url = `${environment.host}products`;
        return this.httpClient.put(url, options);
    }

    addProduct(product: Product) {
        const options = {
            headers: this.httpHeaders
        };

        const url = `${environment.host}products`;
        return this.httpClient.post(url, product, options);
    }
    //formulaire d'ajout de produit.
    buildAddProductForm(): FormGroup {
        const form = this.formBuilder.group(
            {
                name: [""],
                price: ["0"],
                quantity: ["0"],
                available: [false],
                selected: [false]
            }
        )

        return form;
    }
}