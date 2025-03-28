export enum ProductActionsTypes {
    GET_ALL_PRODUCTS = "[Product]Get all product",
    GET_SELECTED_PRODUCTS = "[Product]Get selected product",
    GET_AVAILABLE_PRODUCTS = "[Product]Get available product",
    SEARCH_PRODUCTS = "[Product]Search product",
    EDIT_PRODUCT = "[Product]Edit product",
    DELETE_PRODUCT = "[Product]Delete selected product",
    NEW_PRODUCT = "[Product]New product",
    SELECT_PRODUCT = "[Product]Select product"
}

export enum DataStateEnum {
    LOADING = "LOADING",
    LOADED = "LOADED",
    ERROR = "ERROR",
}

export interface ActionEvent {
    type: ProductActionsTypes;
    payload?: any;
}

export interface AppDataState<T> {
    dataState: DataStateEnum,
    data?: T,
    errorMessage?: string
}