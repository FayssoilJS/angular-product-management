export enum DataStateEnum {
    LOADING = "LOADING",
    LOADED = "LOADED",
    ERROR = "ERROR",
}

export interface AppDataState<T> {
    dataState: DataStateEnum,
    data?: T,
    errorMessage?: string
}