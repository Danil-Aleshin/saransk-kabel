import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import BreadCrumbs from "../../Components/BreadCrumbs/BreadCrumbs"
import PageTitle from "../../Components/PageTitle"
import { useAppSelector } from "../../hooks/appRedux"
import useInput from "../../hooks/useInput"
import { emptyCart, reqEmptyCart } from "../../store/CartSlice"
import { reqCheckoutOrder } from "../../store/OrdersSlice"
import { IOrder } from "../../types/data"
import CartItemInOrder from "./CartItemInOrder"
import './CheckoutOrder.scss'
const CheckoutOrder:React.FC = () => {
  const [payment, setPayment] = useState<"cash"| "card to courier">("cash")

  const dispatch = useDispatch()
  const {status} = useAppSelector(state => state.orders)
  const cart = useAppSelector(state => state.cart)
  const user = useAppSelector(state => state.auth)

  const navigate = useNavigate()

  const address = useInput()
  const comment = useInput()

  useEffect(() => {
    if (cart.cartItems.length === 0) {
      // navigate("/cart")
    }
  }, [])

  const checkoutOrder = (userId:string) =>{
    const newOrder:IOrder = {
      id: Date.now(),
      address:address.value,
      comment:comment.value,
      date: new Date().toString(),
      payment :payment,
      status:"обрабатывается",
      totalPrice:cart.cartTotalPrice,
      isActive:true,
      productsList:cart.cartItems,
    }
    dispatch(reqCheckoutOrder({newOrder,userId}))
      dispatch(reqEmptyCart(userId))
      navigate("/profile")
  }
  return (
    <main>
      <div className="container">
        <PageTitle text="Офрмление заказа"/>
        <BreadCrumbs/>
        <div className="checkout-order">
          <form className="checkout-order__form">
            <div className="checkout-order__form__input">
              <label htmlFor="address">Адрес</label>
              <input value={address.value} onChange={address.onChange} type="text" id="address" name="address" placeholder="Москва,Тверская 110а квартира 10" />
            </div>
            <div className="checkout-order__form__input">
              <textarea onChange={comment.onChange} value={comment.value} id="comment" name="comment" placeholder="Коментарий..." />
            </div>
            <div className='options-order__item'>
              <input defaultChecked id="checkCashPayment" className="options__radio" name="payment" type="radio" value="cash" onChange={()=>setPayment("cash")} />
              <label className="radio__title" htmlFor="checkCashPayment">Наличными</label>
            </div>
            <div className='options-order__item'>
              <input id="checkCardPayment" className="options__radio" name="payment" type="radio" value="card to courier" onChange={()=>setPayment("card to courier")}/>
              <label className="radio__title" htmlFor="checkCardPayment">Картой курьеру</label>
            </div>
          </form>
          <ul className="order-item__list">
            {cart.cartItems.map((item)=> 
            <CartItemInOrder
              key={item.id}
              name={item.name}
              img={item.img}
              meters={item.meters}
              totalPrice={item.totalPrice}
              path={item.path}
            />)}
          </ul>
        </div>
        <button className="checkout-oreder__btn" onClick={()=>checkoutOrder(user.userInfo.userId)}>
          Заказать
        </button>
      </div>
    </main>
  )
}

export default CheckoutOrder