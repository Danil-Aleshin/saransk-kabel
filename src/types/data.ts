import { Dispatch, SetStateAction } from "react"

export type TypeSetState<T> = Dispatch<SetStateAction<T>>

export interface IProductsCategoryItem{
  id:number,
  name:string,
  src:string,
  path:string,
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
  path:string,
  gost:string,
  pricePerM:number,
  status:boolean,
  img:string,
  description:string,
  construction:string[],
  characteristics:string[],
}

export interface IUserInfo{
  userId: string,
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
  id:number
  productsList:ICartItem[],
  date:string,
  address:string,
  comment:string,
  payment:"cash" | "card to courier",
  totalPrice:number,
  status: "обрабатывается" | "принят" | "отправлен" | "ожидает получения" | "получен",
  isActive:boolean
}

export interface IUserData{
  cart:ICartItem[],
  orders:IOrder[],
  userInfo:IUserInfo
}

export interface IRoutes{
  path:string,
  src?:string,
  component:React.FC,
  name:string,
  auth:boolean,
}
export interface IOfficesCard{
  id:number,
  
  city:string, 
  address:string, 
  wMode:string, 
  room?:string, 
  rAddress?:string, 
  rName?:string, 
}
export interface ICertificatesCard{
  id:number,
  name:string,
  img:string,
}
export interface IQualityPolicyCard extends ICertificatesCard{

}