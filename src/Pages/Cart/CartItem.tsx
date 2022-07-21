import { memo, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/appRedux"
import { changeCartTotalPrice, changeLength, removeCartItem, reqDeleteCartItem } from "../../store/CartSlice"
import ChangeValueForm from "../../Components/ChangeValueForm/ChangeValueForm"
import './CartItem.scss'

interface propsCartItem{
  name:string,
  img:string,
  meters:number,
  totalPrice:number,
  id:number,
  index:number,
  locPath:string,
  pricePerM:number,
}
const CartItem:React.FC<propsCartItem> = ({ name, img, meters, totalPrice, id, index, locPath, pricePerM }) => {
  const [newLength, setNewLength] = useState(meters)

  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.auth)

  useEffect(() => {
    dispatch(changeLength({ id, newLength }))
    setNewLength(Math.max(newLength, 1))
    dispatch(changeCartTotalPrice()) 
  }, [newLength])


  const removeItem = () => {
    const userId = user.userInfo.userId
    if (user.userAuth) {
      dispatch(reqDeleteCartItem({userId,index}))
    }else{
      dispatch(removeCartItem(index))
    }
  }

  return (
    <div className="cart__item">
      <Link to={locPath} className='leftBlock'>
        <img className='product__img' width={180} src={img} alt="" />
        <div className="name">
          <h4>{name}</h4>
        </div>
      </Link>
      <p className='pricePerM'>{pricePerM} ₽/м</p>
      <div className='changeMeters'>
        <ChangeValueForm value={newLength} setValue={setNewLength} />
      </div>
      <div className="sum">{totalPrice > 99999999 ? 99999999 + "...₽" : totalPrice + "₽"}</div>
      <button className='remove__btn' onClick={() => removeItem()}>
        <svg className='remove__icon' xmlns="http://www.w3.org/2000/svg" version="1.0" width="20" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
          <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
            <path d="M2032 5101 c-66 -23 -126 -79 -158 -146 -22 -47 -24 -61 -24 -237 l0 -188 -498 0 c-547 0 -559 -1 -640 -60 -73 -53 -97 -98 -173 -328 -62 -189 -71 -223 -66 -268 7 -65 36 -122 83 -164 54 -47 97 -62 196 -68 l87 -5 6 -41 c3 -22 61 -743 130 -1601 69 -858 130 -1585 135 -1615 31 -179 188 -335 369 -370 34 -6 433 -10 1110 -10 881 0 1067 3 1124 15 81 17 170 68 233 134 47 48 107 161 118 221 6 32 266 3212 266 3253 0 13 9 17 43 17 82 0 147 27 202 83 96 98 97 153 10 418 -71 214 -102 272 -173 326 -82 62 -93 63 -639 63 l-493 0 0 148 c0 82 -5 175 -11 208 -18 100 -83 179 -177 214 -50 19 -78 20 -530 20 -437 -1 -482 -2 -530 -19z m948 -426 l0 -145 -415 0 -415 0 0 145 0 145 415 0 415 0 0 -145z m1304 -583 c25 -75 46 -140 46 -145 0 -4 -796 -7 -1770 -7 -974 0 -1770 1 -1770 3 0 7 89 267 95 277 4 7 534 10 1680 10 l1673 0 46 -138z m-254 -464 c0 -7 -58 -732 -129 -1610 -96 -1180 -134 -1604 -144 -1625 -19 -36 -55 -69 -90 -82 -19 -8 -359 -11 -1081 -11 l-1052 0 -44 23 c-89 44 -73 -84 -214 1677 -69 861 -128 1582 -131 1603 l-5 37 1445 0 c1149 0 1445 -3 1445 -12z" />
            <path d="M1599 3437 c-19 -12 -43 -39 -53 -59 l-20 -35 76 -1386 c83 -1521 73 -1420 141 -1471 39 -29 125 -29 164 0 47 35 65 77 64 147 0 34 -32 656 -72 1382 -78 1454 -71 1382 -141 1425 -46 28 -115 27 -159 -3z" />
            <path d="M2482 3440 c-20 -12 -41 -38 -53 -65 -19 -43 -19 -75 -17 -1429 3 -1381 3 -1385 24 -1412 37 -51 71 -69 127 -69 62 0 112 30 133 81 12 28 14 260 14 1421 0 1367 0 1388 -20 1421 -43 69 -139 94 -208 52z" />
            <path d="M3362 3439 c-44 -29 -64 -70 -69 -144 -2 -33 -35 -653 -73 -1378 -46 -902 -65 -1329 -59 -1352 19 -66 108 -117 176 -100 39 9 81 42 99 76 12 24 28 285 85 1362 39 733 69 1365 67 1405 -3 68 -5 74 -40 109 -33 32 -44 37 -95 40 -47 3 -64 0 -91 -18z" />
          </g>
        </svg>
      </button>
    </div>
  )
}
export default CartItem