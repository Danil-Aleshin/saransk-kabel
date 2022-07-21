import './Header.scss';
import './Header-media.scss'
import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect, memo } from 'react'
import NavDesktop from '../NavBlock/NavDesktop';
import NavMobile from '../NavBlock/NavMobile';
import SwitchThemeBtn from '../SwitchThemeBtn/SwitchThemeBtn'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux';
import { TypeSetState } from '../../types/data';



const Header:React.FC = memo(() => {

  const [menuState, setMenuState] = useState(false)
  const [screenWidth, setScreenWidth] = useState(0)

  const { cartItems } = useAppSelector(state => state.cart)
  const { products } = useAppSelector(state => state.products)
  const { userInfo,userAuth } = useAppSelector(state => state.auth)
  const currentTheme = useAppSelector(state => state.theme.theme)
  const cartTotalPrice = useAppSelector(state => state.cart.cartTotalPrice)

  const dispatch = useAppDispatch()

  const location = useLocation()

  useEffect(() => {
    window.scroll(0, 0)
    if (menuState) {
      document.body.classList.add("lock")
    } else {
      document.body.classList.remove("lock")
    }
  }, [menuState])

  useEffect(() => {
    setScreenWidth(window.screen.width)
  }, [window.screen.width])

  useEffect(() => {
    setMenuState(false)

  }, [location.pathname])


  if (location.pathname === "/login" || location.pathname === "/registration") {
    return null
  }

  return (
    <>
      <header>
        <div className="container">
          <div className="header__inner">
            <Link className='logo-black-theme' to="/">
              <img width="100%" src={screenWidth < 425 ? "/img/logo-small.png" : "/img/logo-black-theme.png"} alt="" />
            </Link>

            {screenWidth < 768 ?
              <NavMobile menuState={menuState} setMenuState={setMenuState} product={products} />
              :
              <NavDesktop product={products} />}

            <div className='mobile-link-block'>
              <SwitchThemeBtn />
              <Link to="cart" className="cart__block-mobile">
                <div className="cart__icon">
                  <img className='icon' src="/img/icons/cart-icon-white.png" alt="" />
                  <div className="number-items">
                    <span>{cartItems.length}</span>
                  </div>
                </div>
              </Link>
              <Link to="/profile" className="profile">
                <svg className='profile-icon' xmlns="http://www.w3.org/2000/svg" width="22" height="28" viewBox="0 0 22 28" fill="none">
                  <path d="M10.6807 14.9052C10.707 14.9052 10.7332 14.9052 10.7647 14.9052C10.7751 14.9052 10.7856 14.9052 10.7961 14.9052C10.8119 14.9052 10.8328 14.9052 10.8486 14.9052C12.3854 14.8766 13.6285 14.2866 14.5463 13.1581C16.5657 10.672 16.23 6.41005 16.1933 6.00333C16.0622 2.95011 14.7404 1.48938 13.6494 0.8077C12.8364 0.297875 11.8871 0.0229135 10.8276 0H10.7909C10.7856 0 10.7751 0 10.7699 0H10.7384C10.1562 0 9.0128 0.103111 7.91659 0.784787C6.81512 1.46646 5.47239 2.9272 5.34126 6.00333C5.30455 6.41005 4.96887 10.672 6.98821 13.1581C7.90085 14.2866 9.14393 14.8766 10.6807 14.9052ZM6.74169 6.14654C6.74169 6.12936 6.74694 6.11217 6.74694 6.10072C6.92003 1.99347 9.58976 1.55239 10.7332 1.55239H10.7542C10.7647 1.55239 10.7804 1.55239 10.7961 1.55239C12.2123 1.58676 14.6198 2.21688 14.7824 6.10072C14.7824 6.1179 14.7824 6.13509 14.7876 6.14654C14.7929 6.18664 15.16 10.0819 13.4921 12.1327C12.8312 12.9461 11.95 13.3471 10.7909 13.3586C10.7804 13.3586 10.7751 13.3586 10.7647 13.3586C10.7542 13.3586 10.7489 13.3586 10.7384 13.3586C9.58451 13.3471 8.6981 12.9461 8.04247 12.1327C6.37978 10.0934 6.73645 6.18091 6.74169 6.14654Z" fill="white" />
                  <path d="M21.543 21.974C21.543 21.9683 21.543 21.9626 21.543 21.9568C21.543 21.911 21.5377 21.8652 21.5377 21.8136C21.5062 20.6794 21.4381 18.0272 19.1617 17.1794C19.146 17.1737 19.125 17.1679 19.1092 17.1622C16.7437 16.5034 14.7768 15.0141 14.7558 14.9969C14.4359 14.7506 13.9953 14.8365 13.7698 15.1859C13.5442 15.5353 13.6229 16.0165 13.9428 16.2628C14.032 16.3316 16.1196 17.9183 18.7316 18.6516C19.9537 19.127 20.0901 20.5534 20.1268 21.8595C20.1268 21.911 20.1268 21.9568 20.132 22.0027C20.1373 22.5182 20.1058 23.3145 20.0219 23.7727C19.1722 24.2997 15.8416 26.1214 10.7748 26.1214C5.72905 26.1214 2.37745 24.294 1.5225 23.767C1.43858 23.3087 1.40186 22.5125 1.41235 21.9969C1.41235 21.9511 1.4176 21.9053 1.4176 21.8537C1.45431 20.5477 1.59069 19.1213 2.81279 18.6458C5.42484 17.9126 7.51238 16.3201 7.60155 16.2571C7.9215 16.0108 8.00017 15.5296 7.77463 15.1802C7.5491 14.8308 7.10851 14.7448 6.78856 14.9911C6.76758 15.0083 4.81116 16.4977 2.43514 17.1565C2.41416 17.1622 2.39843 17.1679 2.38269 17.1737C0.106329 18.0272 0.0381432 20.6794 0.00667272 21.8079C0.00667272 21.8595 0.0066726 21.9053 0.00142752 21.9511C0.00142752 21.9568 0.00142752 21.9626 0.00142752 21.9683C-0.00381755 22.2662 -0.00906252 23.7956 0.268927 24.5633C0.321377 24.7122 0.415789 24.8382 0.541671 24.9241C0.699023 25.0387 4.47023 27.6623 10.7801 27.6623C17.0899 27.6623 20.8611 25.033 21.0185 24.9241C21.1391 24.8382 21.2387 24.7122 21.2912 24.5633C21.5535 23.8014 21.5482 22.2719 21.543 21.974Z" fill="white" />
                </svg>
                <span>{userAuth ? userInfo.firstName + " " + userInfo.lastName : "Войти"}</span>
              </Link>
              {screenWidth < 768 &&
                <div
                  className={menuState ? "header__burger active" : "header__burger"}
                  onClick={() => setMenuState(!menuState)}
                >
                  <span className='burgerIconLine'></span>
                </div>
              }
            </div>
          </div>
        </div>
      </header >
      <div className="subheader">
        <div className="container">
          <div className="subheader__inner">
            <Link className='logo' to="/"><img width="100%" src={currentTheme === "light" ? "/img/logo-yellow.png" : "/img/logo-black-theme.png"} alt="" /></Link>
            <a href='https://goo.gl/maps/J5VK74pwpCjw7LPAA' target="blank" className="location">
              <svg className='location__icon' xmlns="http://www.w3.org/2000/svg" width="17" height="25" viewBox="0 0 17 25" fill="none">
                <path d="M8.5 0C3.8131 0 0 3.85087 0 8.5842C0 10.1834 0.438647 11.7441 1.26881 13.0982L8.01616 24.0791C8.14541 24.2895 8.37311 24.4173 8.61801 24.4173C8.6199 24.4173 8.62174 24.4173 8.62363 24.4173C8.87065 24.4153 9.09883 24.2836 9.22571 24.0695L15.8011 12.9822C16.5854 11.6568 17 10.136 17 8.5842C17 3.85087 13.1869 0 8.5 0ZM14.5853 12.2477L8.60729 22.3278L2.47289 12.3444C1.78188 11.2174 1.40722 9.91714 1.40722 8.5842C1.40722 4.63976 4.59425 1.42116 8.5 1.42116C12.4058 1.42116 15.5881 4.63976 15.5881 8.5842C15.5881 9.87761 15.2381 11.1446 14.5853 12.2477Z" fill="black" />
                <path d="M8.49647 3.61743C5.89259 3.61743 3.77417 5.64587 3.77417 8.13915C3.77417 10.6165 5.85812 12.6609 8.49647 12.6609C11.1673 12.6609 13.2188 10.5893 13.2188 8.13915C13.2188 5.64587 11.1003 3.61743 8.49647 3.61743ZM8.49647 11.1637C6.75147 11.1637 5.33777 9.80551 5.33777 8.13915C5.33777 6.47697 6.76055 5.11462 8.49647 5.11462C10.2324 5.11462 11.6499 6.47697 11.6499 8.13915C11.6499 9.78119 10.2691 11.1637 8.49647 11.1637Z" fill="black" />
              </svg>
              <h3>Саранск</h3>
            </a>
            <a className='phone-number' href='tel:88007075458'>8 (800) 707-54-58</a>
            <Link to="cart" className="cart__block">
              <div className="cart__icon">
                <img className='icon' src={currentTheme === "light" ? "/img/icons/cart-icon.png" : "/img/icons/cart-icon-white.png"} alt="" />
                <div className="number-items">
                  <span>{cartItems.length}</span>
                </div>
              </div>
              <div className="order-info">
                <p>{cartTotalPrice}р.</p>
                <p className="checkout">Оформить заказ</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
})
export default Header