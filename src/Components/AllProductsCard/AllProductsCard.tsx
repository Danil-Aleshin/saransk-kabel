import { Link } from "react-router-dom"

import './AllProductsCard.scss'

interface propsAllProductsCard{
  name:string,
  img:string,
  src:string,
  number:number,
}

const AllProductsCard:React.FC<propsAllProductsCard> = ({name,img,src,number}) => {

  const numDeclensions = ():string => {
    if (number % 10 === 1) {
      return number + " товар"
    } else if (number % 10 === 2 || number % 10 === 3 || number % 10 === 4) {
      return number + " товара"
    } else {
      return number + " товаров"
    }
  }
  return (
    <Link to={src} className="product-card">
      <div className="product__img__block">
        <div className="product__img">
          <img width="300" src={img} alt="" />
        </div>
      </div>
      <div className="product__info">
        <h3 className="name">{name}</h3>
        <p className="number">{numDeclensions()}</p>
      </div>
    </Link>
  )
}

export default AllProductsCard