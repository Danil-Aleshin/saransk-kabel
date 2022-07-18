import { useDispatch, useSelector } from 'react-redux'
import { emptyCart } from '../../store/CartSlice'
import './Cart.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux';
import BreadCrumbs from '../../Components/BreadCrumbs/BreadCrumbs';
import PageTitle from '../../Components/PageTitle';
import CartItem from './CartItem';

interface propsCart{
  signWindowLog:boolean,
  setSigInWindowLog:React.Dispatch<React.SetStateAction<boolean>>,
}

const Cart:React.FC<propsCart> = ({ setSigInWindowLog, signWindowLog })=> {

  const {cartItems,cartTotalPrice} = useAppSelector(state => state.cart)
  const {userAuth} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  
  const navigate = useNavigate()

  const checkout = () => {  
  
    if (userAuth) {
      navigate("/checkout")
    }else{
      setSigInWindowLog(true)
      console.log(signWindowLog)
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
                locPath = {item.srcNav}
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
                <button className='place-order__btn' onClick={() => checkout()}>
                  Оформить заказ
                </button>
              </div>
              <button className='empty-cart-btn' onClick={() => dispatch(emptyCart())}>
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