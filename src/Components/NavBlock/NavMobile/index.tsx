import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { IProductsCategoryItem, TypeSetState } from '../../../types/data'
import './NavMobile.scss'

interface propsLinksFC{
  name:string,
  src:string,
}

interface propsNavMobile{
  menuState:boolean, 
  setMenuState: TypeSetState<boolean>, 
  product:IProductsCategoryItem[]
}
const NavMobile:React.FC<propsNavMobile> = 
({ menuState, setMenuState, product = [] })=>{

  useEffect(() => {
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  const navMenuRef = useRef<any>(null)

  const close = (e:any) => {
    
    if (!navMenuRef.current.contains(e.target) 
        && e.target.className !== "header__burger active"
       ) {
      setMenuState(false)
    }
  }
  
  const showMobileNavMenu = (e:any) => {
    const navItem = e.currentTarget.parentNode
    navItem.classList.toggle("active--nav-mobile__item")
  }

  
  return (
    <ul ref={navMenuRef} className={menuState ? "nav-mobile active--nav-movile" : "nav-mobile"}>
      <li className="nav__item">
        <Link className="nav__link" to="/products ">Каталог товаров</Link>
        <span className="arrow" onClick={e => showMobileNavMenu(e)}></span>
        <ul className="drop-menu">
          {
            product.map(obj => <li key={obj.id} ><Links {...obj} /></li>)
          }
        </ul>
      </li>
      <li className="nav__item">
        <Link className="nav__link" to="/aboutus">О компании</Link>
        <span className="arrow" onClick={e => showMobileNavMenu(e)}></span>
        <ul className="drop-menu">
          <li><Link to="/aboutus/requisites" >Реквизиты</Link></li>
          <li><Link to="/aboutus/history" >История</Link></li>
          <li><Link to="/aboutus/quality-policy" >Политика качества</Link></li>
          <li><Link to="/aboutus/certificates" >Сертификаты</Link></li>
        </ul>
      </li>
      <li className="nav__item">
        <Link className="nav__link" to="/stock">Партнерам</Link>
        <span className="arrow" onClick={e => showMobileNavMenu(e)}></span>
        <ul className="drop-menu">
          <li><Link to="/stock" >Складское наличие</Link></li>
          <li><Link to="/documents" >Документы</Link></li>
        </ul>
      </li>
      <li className="nav__item" >
        <Link className="nav__link" to={"/offices"} >Офисы</Link>
      </li>
      <li className="nav__item">
        <Link className="nav__link" to="/vacancies">Вакансии</Link>
        <ul className="drop-menu">
        </ul>
      </li>
    </ul>
  )
}

const Links:React.FC<propsLinksFC> = ({ src, name })=> {
  return (
    <Link to={`products/${src}`}>{name}</Link>
  )
}
export default NavMobile