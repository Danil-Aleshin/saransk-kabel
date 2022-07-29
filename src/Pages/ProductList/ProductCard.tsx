import './ProductCard.scss'
import { Link } from "react-router-dom";

interface propsProductCard{
  img:string,
  gost:string,
  name:string,
  src:string,
  status:boolean
}

const ProductCard:React.FC<propsProductCard> = ({ img, gost, name, src, status }) => {
  return (
    <li className='product__item'>
      {status ||
        <Link to={src} className='outStock'>
        </Link>}
      <Link className='product__link' to={src}>
        <div className='product__img item'>
          <img width="200" height="45" src={img} alt="" />
        </div>
        <h4 className='name item'>{name}</h4>
        <p className="gost item">{gost.length > 13 ? gost.substr(0, 13) + "..." : gost}</p>

      </Link>
    </li>
  )
}

export default ProductCard

