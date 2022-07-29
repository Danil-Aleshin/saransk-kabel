import { emptyCart, reqEmptyCart } from '../../store/CartSlice'
import './Cart.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux';
import BreadCrumbs from '../../Components/BreadCrumbs/BreadCrumbs';
import PageTitle from '../../Components/PageTitle';
import CartItem from './CartItem';




const Cart:React.FC = ()=> {

  const {cartItems,cartTotalPrice, error,status} = useAppSelector(state => state.cart)
  const user = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const emptyCartFunc = (userId:string) =>{
    if (user.userAuth) {
      dispatch(reqEmptyCart(userId))
    }else{
      dispatch(emptyCart())
    }
  }
  const checkoutOrder = () =>{
    if (cartTotalPrice < 1000) {
      alert("Доставка осуществляется от 1000р.")
    }else{
      navigate("/checkout-order")
    }
  }
  return (
    <main>
      <div className="container">
        <PageTitle text='Корзина'/>
        <BreadCrumbs />
        <div className="cart__box">
          <div className="cart__list">
            {cartItems.length > 0 ?
              cartItems.map((item, index) => 
              <CartItem
                key={item.id} 
                name={item.name}
                img={item.img}
                meters={item.meters}
                totalPrice={item.totalPrice}
                id={item.id}
                locPath = {item.path}
                pricePerM ={item.pricePerM}
                index={index} 
              />)
              :
              <div className='empty-cart-block'>
                <img width={150} src="/img/icons/sad1.png" alt="" className='empty-cart-img' />
                <h3>Ваша корзина пуста</h3>
                <Link className='Allproducts__link' to={"/products"}>Каталог продукции</Link>
              </div>

            }
          </div>

          {cartItems.length > 0 ?
            <div className='order__info'>
              <div className='ordder'>
                <h3 className='total-price'>Общая стоимсоть <span className='orng'>{cartTotalPrice}₽</span></h3>
                <button onClick={()=> checkoutOrder()} className='checkout-order__btn'>
                  Оформить заказ
                </button>
              </div>
              <button className='empty-cart-btn' onClick={() => emptyCartFunc(user.userInfo.userId)}>
                Очистить корзину
              </button>
            </div>
            :
            null
          }
        </div>
      </div>
    </main>
  )
}


export default Cart