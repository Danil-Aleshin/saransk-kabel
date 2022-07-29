import React, { useState, useEffect } from "react"
import ProductCard from "./ProductCard"
import './ProductList.scss'
import { useLocation, useParams } from 'react-router-dom'
import BreadCrumbs from "../../Components/BreadCrumbs/BreadCrumbs"
import PageTitle from "../../Components/PageTitle"
import useInput from "../../hooks/useInput"
import SearchInput from "../../Components/SearchInput/SearchInput"
import { useAppSelector } from "../../hooks/appRedux"
import {IProductsItem } from "../../types/data"

const ProductList:React.FC = () => {
  const [cables, setCables] = useState<IProductsItem[]>([])

  const products = useAppSelector(state => state.products.products)

  const searchValue = useInput()

  const { src } = useParams()
  const location = useLocation()

  useEffect(() => {
    const Allcables:IProductsItem[] = products.filter(item => item.src === src).flatMap(item => item.items)
    setCables(Allcables)
  }, [products, location.pathname])


  const pageTitle:string = products.filter(item => item.src === src).map(el => el.name).join("")

  const filtredKabel = cables.filter(item => {
    return item.name.toLowerCase().includes(searchValue.value.toLowerCase())
  }).sort(function (a, b) {
    return (a.status === b.status) ? 0 : a.status ? -1 : 1;
  })


  return (
    <main>
      <div className="container">
        <PageTitle text={searchValue.value ? "Поиск: " + searchValue.value :pageTitle} />
        <BreadCrumbs />
        <SearchInput searchValue={searchValue.value} setSearchValue={searchValue.setValue} />
        <ul className="product__list">
          {filtredKabel.length > 0 ?
            filtredKabel.map(item => <ProductCard key={item.id} 
                img={item.img}
                gost={item.gost}
                name={item.name}
                src={item.src}
                status={item.status}
              />)
            :
            <div className="missing-products">
              <img className="missing-products__img" width={200} src="/img/icons/smart.png" alt="" />
              <h3 className="missing-products__title">Не могу найти данные кабели</h3>
            </div>
          }
        </ul>
      </div>
    </main>
  )
}

export default ProductList