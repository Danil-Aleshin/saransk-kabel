import React, { useState, useEffect } from "react"
import ProductCard from "./ProductCard"
import './ProductList.scss'
import { useLocation, useParams } from 'react-router-dom'
import { useSelector } from "react-redux"
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore"
import { db } from "../../firebaseCofig"
import BreadCrumbs from "../../Components/BreadCrumbs/BreadCrumbs"
import PageTitle from "../../Components/PageTitle"
import useInput from "../../hooks/useInput"
import SearchInput from "../../Components/SearchInput/SearchInput"

const ProductList = () => {
  const { src } = useParams()
  const products = useSelector(state => state.products.products)
  const searchValue = useInput()
  const [cables, setCables] = useState([])
  const location = useLocation()
  useEffect(() => {
    const Allcables = products.filter(item => item.src === src).flatMap(item => item.items)
    setCables(Allcables)
    // const addLogins = async (e) =>{

    //   try {
    //     const docRef = doc(db,"products", "cables");
    //     products.map(item=>{
    //       updateDoc(docRef,{
    //         arr: arrayUnion(item)
    //       });
    //     })

    //   } catch (error) {
    //     console.log(error);
    //   }

    // }
    // // addLogins()
  }, [products, location.pathname])


  const pageTitle = products.filter(item => item.src === src).map(el => el.name)

  const filtredKabel = cables.filter(item => {
    return item.name.toLowerCase().includes(searchValue.value.toLowerCase())
  }).sort(function (a, b) {
    return (a.status === b.status) ? 0 : a.status ? -1 : 1;
  })


  return (
    <main>
      <div className="container">
        <PageTitle text={searchValue ? "Поиск: " + searchValue : pageTitle} />
        <BreadCrumbs />
        <SearchInput searchValue={searchValue.value} setSearchValue={searchValue.setValue} />
        <ul className="product__list">
          {filtredKabel.length > 0 ?
            filtredKabel.map(item => <ProductCard key={item.id} {...item} />)
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