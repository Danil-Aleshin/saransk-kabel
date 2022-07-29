import { memo } from "react"
import { Link } from "react-router-dom"

interface ICartItemInOrder{
  name:string,
  img:string,
  meters:number,
  totalPrice:number,
  path:string
}
const CartItemInOrder:React.FC<ICartItemInOrder> = memo(({name,img,meters,totalPrice,path}) => {
  return (
    <li className="cart-item-in-order">
      <Link to={path}>
        <img src={img} alt={name} width="180" className="order__item__img" />
      </Link>
      <p>{name}</p>
      <p>{meters} Длина(м)</p>
      <p className="total-price">{totalPrice} руб.</p>
  </li>
  )
})

export default CartItemInOrder