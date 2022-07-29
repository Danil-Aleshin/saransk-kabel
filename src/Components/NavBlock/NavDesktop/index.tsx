import { Link } from 'react-router-dom'
import { IProductsCategoryItem } from '../../../types/data'
import './NavDesktop.scss'

interface propsLinksFC{
  name:string,
  src:string,
}

interface propsNavDesktop{
  product:IProductsCategoryItem[]
}

const NavDesktop:React.FC<propsNavDesktop> = ({ product = [] })=>{

  const showDropMenu = (e:any) => {
    const navItem = e.currentTarget
    navItem.classList.add("active--nav__item")
  }
  const closeDropMenu = (e:any) => {
    const navItem = e.currentTarget
    navItem.classList.remove("active--nav__item")
  }
  return (
    <ul className="nav-desktop">
      <li className="nav__item" onMouseOut={e => closeDropMenu(e)} onMouseOver={(e) => showDropMenu(e)}>
        <Link className="nav__link" to="/products ">Каталог товаров</Link>
        <span className="arrow" onClick={e => showDropMenu(e)}></span>
        <ul className="drop-menu">
          {
            product.map(obj => <li key={obj.id} ><Links {...obj} /></li>)
          }
        </ul>
      </li>
      <li className="nav__item" onMouseOut={e => closeDropMenu(e)} onMouseOver={(e) => showDropMenu(e)}>
        <Link className="nav__link" to="/aboutus">О компании</Link>
        <span className="arrow" onClick={e => showDropMenu(e)}></span>
        <ul className="drop-menu">
          <li><Link to="/aboutus/requisites" >Реквизиты</Link></li>
          <li><Link to="/aboutus/history" >История</Link></li>
          <li><Link to="/aboutus/quality-policy" >Политика качества</Link></li>
          <li><Link to="/aboutus/certificates" >Сертификаты</Link></li>
        </ul>
      </li>
      <li className="nav__item" onMouseOut={e => closeDropMenu(e)} onMouseOver={(e) => showDropMenu(e)}>
        <Link className="nav__link" to="/stock">Партнерам</Link>
        <span className="arrow" onClick={e => showDropMenu(e)}></span>
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

const Links:React.FC<propsLinksFC> = ({ src, name }) =>{
  return (
    <Link to={`products/${src}`}>{name}</Link>
  )
}

export default NavDesktop