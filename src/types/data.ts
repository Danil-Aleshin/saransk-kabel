import { Dispatch, SetStateAction } from "react"

export type TypeSetState<T> = Dispatch<SetStateAction<T>>

export interface IProductsCategoryItem{
  id:number,
  name:string,
  src:string,
  srcNav:string,
  img:string,
  items:IProductsItem[],
}
export interface IProductsData{
  arr:IProductsCategoryItem[]
}
export interface IProductsItem{
  id:number,
  name:string,
  src:string,
  srcNav:string,
  gost:string,
  pricePerM:number,
  status:boolean,
  img:string,
  description:string,
  construction:string[],
  characteristics:string[],
}

export interface IUserInfo{
  userId: string | null,
  email: string | null,
  password:string | null,
  firstName: string | null,
  lastName: string | null,
  phoneNumber:string | null,

}

export interface ICartItem extends IProductsItem{
  meters:number,
  totalPrice:number,
}

export interface IOrder{
  productsList:ICartItem[],
  date:Date,
  address:string,
  totalPrice:number
}

export interface IUserData{
  cart:ICartItem[],
  orders:IOrder[],
  userInfo:IUserInfo
}
