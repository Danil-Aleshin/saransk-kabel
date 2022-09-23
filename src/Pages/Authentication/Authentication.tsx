import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'
import { FormEventHandler, KeyboardEventHandler, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import AuthFormItem from '../../Components/AuthFormItem/AuthFormItem'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import useInput from '../../hooks/useInput'
import { fetchAuthentication } from '../../store/AuthenticationSlice'
import { getUserCart } from '../../store/CartSlice'
import './SignIn.scss'


const Authentication:React.FC = () => {

  const [passwordVisibility, setPasswordVisibility] = useState(false)

  const login = useInput("")
  const password = useInput("")

  const dispatch = useAppDispatch()
  const {error,status,userAuth,userInfo} = useAppSelector(state => state.auth)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (userAuth) {
      navigate("/")
    }
  }, [userAuth])

  useEffect(() => {
    if (status === "fetchAuthentication fulfield" && userAuth) {
      const userId = userInfo.userId
      dispatch(getUserCart(userId))
      navigate("/profile")
      login.setValue("")
      password.setValue("")
    }
  }, [userAuth])

  const auth:FormEventHandler = (e) => {
    const loginValue = login.value
    const passwordValue = password.value
    e.preventDefault()
    dispatch(fetchAuthentication({loginValue,passwordValue}))
  }

  return (
    <main>
        <div className='auth-window'>
          <h1 className='title'>Авторизация</h1>
          <div className='form'>
            <form action='#' className='form__checkout'>
              <AuthFormItem
                label="Логин"
                id="formLogin"
                type="text"
                name='login'
                placeholder="Электронная почта"
                {...login}
              />
              <AuthFormItem
                label="Пароль" 
                id="formPassword" 
                type={passwordVisibility ? "text" : "password"}
                name='password' 
                placeholder="*********"
                children={passwordVisibility ?
                  <EyeOffIcon className='showPass' onClick={() => setPasswordVisibility(false)} />
                  :
                  <EyeIcon onClick={(e) => setPasswordVisibility(true)} className='showPass' />
                }
                {...password}
              />
              <div className='options'>
                <div className='options__item'>
                  <input id="checkSavePass" className="checkbox" type="checkbox" />
                  <label className="checkbox__title" htmlFor="checkSavePass">Запомнить пароль</label>
                </div>
              </div>
              <div className='checkout'>
                {status === "auth/invalid-email" && <div style={{ color: "red", fontSize: "12px", textAlign: "center" }}>{"Неверный логин или пароль :("}</div>}
                {status === "auth/user-not-found" && <div style={{ color: "red", fontSize: "12px", textAlign: "center" }}>{"Неверный логин или пароль :("}</div>}
                {status === "auth/wrong-password" && <div style={{ color: "red", fontSize: "12px", textAlign: "center" }}>{"Неверный логин или пароль :("}</div>}
                <Link to="/">На главную странрицу</Link>
                <Link to="#">Забыли пароль?</Link>
                <button className='checkout__btn' type='submit' onClick={(e) => auth(e)}>Войти</button>
                <Link to="/registration">Регистрация</Link>
              </div>
            </form>
          </div>
        </div>
    </main>
  )
}

export default Authentication