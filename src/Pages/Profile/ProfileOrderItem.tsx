import React from 'react'
import { Link } from 'react-router-dom'
import { IOrder } from '../../types/data'

interface propsProfileOrderItem extends IOrder{

}

const ProfileOrderItem:React.FC<propsProfileOrderItem> = 
({id,address,date,status,comment,payment,productsList,totalPrice,isActive}) => {
  return (
    <li className={isActive
      ? 'profile-order__item' 
      :'profile-order__item order--received' 
    }>
      <h3>Заказ №{id}</h3>
      <p>Адрес: {address}</p>
      <p>Дата: {date}</p>
      <p>Статус: {status}</p>
      <ul className='product-list-in-placed-order'>
        {productsList.map(item=>
          <Link key={item.id} to={item.path}><img src={item.img} alt={item.name} width={150}/></Link>
        )}
      </ul>
      <p>Итого: {totalPrice}р.</p>
    </li>
  )
}

export default ProfileOrderItem