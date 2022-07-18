import React from 'react'
import { Link } from 'react-router-dom'

interface propsAboutUSItem{
  linkTo:string,
  img:string,
  title:string,
  alt?:string,
}

const AboutUSItem:React.FC<propsAboutUSItem> = ({linkTo,img,title,alt = ""}) => {
  return (
    <li className="nav__item">
    <Link className="nav__link" to={linkTo}>
      <img className="nav__img" width={230} height={230} src={img} alt={alt} />
      <h3 className="nav__title">{title}</h3>
    </Link>
  </li>
  )
}

export default AboutUSItem