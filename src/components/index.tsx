
export interface ICategoryItem{
    id:number,
    price: number,
    imageUrl:string,
    name:string
}
export interface ICategory{
    title: string,
    items: ICategoryItem[]
}