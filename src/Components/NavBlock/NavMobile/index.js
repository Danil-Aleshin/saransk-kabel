import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './NavMobile.scss'
function NavMobile({ menuState, setMenuState, product = [] }) {
  useEffect(() => {
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])
  const close = (e) => {
    const el = e.target
    if (el.className !== "nav-mobile active--nav-movile"
      && el.className !== "header__burger active"
      && el.className !== "nav__item"
      && el.className !== "arrow"
    ) {
      setMenuState(false)
    }
  }
  const showMobileNavMenu = e => {
    const navItem = e.currentTarget.parentNode
    navItem.classList.toggle("active--nav-mobile__item")
  }
  return (
    <ul className={menuState ? "nav-mobile active--nav-movile" : "nav-mobile"}>
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

function Links({ src, name }) {
  return (
    <Link to={`products/${src}`}>{name}</Link>
  )
}
export default NavMobile