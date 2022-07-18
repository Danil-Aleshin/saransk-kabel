import React, { useState, useEffect } from "react"
import { useLocation, useParams } from 'react-router-dom'
import BreadCrumbs from "../../Components/BreadCrumbs/BreadCrumbs"
import ChangeValueForm from "../../Components/ChangeValueForm/ChangeValueForm"
import PageTitle from "../../Components/PageTitle"
import { useAppDispatch, useAppSelector } from "../../hooks/appRedux"
import { addToCart, changeCartTotalPrice } from "../../store/CartSlice"
import { ICartItem, IProductsItem } from "../../types/data"
import './AboutProduct.scss'

const AboutProduct = () => {
  const [length, setLength] = useState(1)
  const [toggleTabState, setToggleTabState] = useState(1)
  const [description, setDescription] = useState ("")
  const [construction, setConstruction] = useState<string[]>([])
  const [characteristics, setCharacteristics] = useState<string[]>([])
  const [cabelObj, setCabelObj] = useState<IProductsItem>({
    id:0,
    name:"",
    src:"",
    srcNav:"",
    gost:"",
    pricePerM:0,
    status:false,
    img:"",
    description:"",
    construction:[],
    characteristics:[],
  })

  const dispatch = useAppDispatch()
  const {products} = useAppSelector(state => state.products)

  const { src } = useParams()

  useEffect(() => {
    setLength(Math.max(length, 1))
  }, [length])
  const location = useLocation()
  useEffect(() => {
    products.map(el => {
      el.items.map(item => {
        if (item.src === src) {
          setCabelObj(
            Object.assign({
              locPath: location.pathname
            }, item)
          )
          setDescription(item.description)
          setCharacteristics(item.characteristics)
          setConstruction(item.construction)
        }
      })
    })
  }, [products, location.pathname])

  const addItem = (metersValue:number) => {
    const cartItem:ICartItem = Object.assign({
      meters: Number(metersValue),
      totalPrice: cabelObj.pricePerM * metersValue,
    }, cabelObj)
    dispatch(addToCart(cartItem))
    dispatch(changeCartTotalPrice())
    setLength(1)
  }

  return (
    <main>
      <div className="container">
        <PageTitle text={"Кабель" + cabelObj.name}/>
        <BreadCrumbs />
        <div className="product-info__block">
          <div className="main-img">
            <img width="600" src={cabelObj.img} alt="" />
          </div>
          <div className="options">
            <h3>{cabelObj.name}</h3>
            <span className={cabelObj.status ? "status inStock" : "status outStock"}>{cabelObj.status ? "В наличии" : "Нет в наличии"}</span>
            <h3>{cabelObj.pricePerM}₽/М</h3>
            {cabelObj.status &&
              <>
                <div className="changeMeters__block">
                  <label htmlFor="lenght">Длина(м)</label>
                  <ChangeValueForm value={length} setValue={setLength} />
                </div>
                <a className="add-product" onClick={() => addItem(length)}>
                  <p>В корзину</p>
                  <img src="/img/icons/cart-icon-white.png" width={16} alt="" />
                </a>
              </>
            }
          </div>
        </div>
        <div className="tabs">
          <div className="tabs__item">
            <div
              onClick={() => setToggleTabState(1)}
              className={toggleTabState === 1 ? "tab active__tab" : "tab"}>
              <h3 className="tab__title">Описание</h3>
            </div>
            <div
              onClick={() => setToggleTabState(2)}
              className={toggleTabState === 2 ? "tab active__tab" : "tab"}>
              <h3 className="tab__title">Конструкция</h3>
            </div>
            <div
              onClick={() => setToggleTabState(3)}
              className={toggleTabState === 3 ? "tab active__tab" : "tab"}>
              <h3 className="tab__title">Характеристики</h3>
            </div>
          </div>
          <div className="tabs__content">
            <div className={toggleTabState === 1 ? "content active__tab" : "content"}>
              <h4 className="content__title">Описание</h4>
              <div className="content__text"><p>{description}</p></div>
            </div>
            <div className={toggleTabState === 2 ? "content active__tab" : "content"}>
              <h4 className="content__title">Конструкция</h4>
              <div className="content__text">{construction && construction.map((item, index) => <p key={index}>{item}</p>)}</div>
            </div>
            <div className={toggleTabState === 3 ? "content active__tab" : "content"}>
              <h4 className="content__title">Характеристики</h4>
              <div className="content__text">{characteristics && characteristics.map((item, index) => <p key={index}>{item}</p>)}</div>
            </div>
          </div>
        </div>
      </div>
    </main >
  )
}
export default AboutProduct