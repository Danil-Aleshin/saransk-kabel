import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import "./Footer.scss"
function Footer() {
  const [stateSecurityPolicy, setStateSecurityPolicy] = useState(false)
  const [possibilitySubscribe, setPossibilitySubscribe] = useState(true)
  const [subscribeError, setSubscribeError] = useState("")

  const location = useLocation()
  
  const checkSecurityPolicy:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.checked) {
      setStateSecurityPolicy(true)
    } else {
      setStateSecurityPolicy(false)
    }
  }
  const subscribe:React.FormEventHandler<HTMLInputElement> = (e) => {
    const possSubscribe = false
    if (stateSecurityPolicy && !possSubscribe) {
      e.preventDefault()
      setSubscribeError("В данный момент нельзя подписаться :(")
      setPossibilitySubscribe(false)
    }
    if (!stateSecurityPolicy) {
      e.preventDefault()
      setPossibilitySubscribe(false)
      setSubscribeError("Подтвердите согласие на обработку персональных данных")
    }
  }

  if (location.pathname === "/login" || location.pathname === "/registration") {
    return null
  }
  return (
    <footer>
      <div className="container">
        <div className="footer__inner">
          <div className="contact-block">
            <h3>Контакты</h3>
            <div className="contacts">
              <span>
                <a className="contacts__link" href='tel:88007075458'>8 (800) 707-54-58</a>
              </span>
              <span>
                <a className="contacts__link" href='tel:88342777667'>8 (834) 277-76-67</a>
              </span>
              <span>
                <a className="contacts__link" href="mailto:crm@saranskkabel.ru">crm@saranskkabel.ru</a>
              </span>
            </div>
            <div className="social">
              <a className="social__link" href="https://vk.com/club92350104" target={"_blank"}><img width="43" height={41} src="/img/social/vk.png" alt="" /></a>
              <a className="social__link" href="https://www.youtube.com/channel/UC5N8qUJwYMIsN_8fdsb1FwA" target={"_blank"}><img width="46" height={44} src="/img/social/youtube.png" alt="" /></a>
              <a className="social__link" href="https://api.whatsapp.com/send?phone=88007075458"><img width="46" height={44} src="/img/social/whatsup.png" alt="" /></a>
              <a className="social__link" href=""><img width="43" height={41} src="/img/social/telegramm.png" alt="" style={{ marginTop:"2px"}} /></a>
            </div>
          </div>
          <div className="security-policy">
            <h3>Обработка персональных данных</h3>
            <p>Если вы делаете заказ то соглашаетесь с
              <Link to={"/security-policy"} className="orng">
                политикой безопасности и обработкой
                персональных данных ООО «Сарансккабель»
              </Link>
            </p>
          </div>
          <div className="newsletter">
            <h3>Новостная рассылка</h3>
            <p className="subtitle">Подпишитесь прямо сейчас!</p>
            {possibilitySubscribe || <div style={{ color: "red", fontSize: "12px", textAlign: "center", width: "300px", paddingBottom: "5px" }}>{subscribeError}</div>}
            <form action="">
              <input className="text-line" type="text" placeholder="example@gmail.com" />
              <button onClick={(e:any) => subscribe(e)} type="submit"></button>
            </form>
            <div className="check">
              <input onClick={(e:any) => checkSecurityPolicy(e)} id="check" className="checkbox" type="c
              heckbox" />
              <label className="checkbox__title" htmlFor="check">Я прочитал <Link to={"/security-policy"} className="orng">условия соглашения</Link> и согласен с ними</label>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer