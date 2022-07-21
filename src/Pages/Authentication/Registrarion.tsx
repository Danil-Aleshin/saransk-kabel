import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './SignIn.scss'

import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'
import useInput from '../../hooks/useInput'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import { fetchRegistration } from '../../store/AuthenticationSlice'
import AuthFormItem from '../../Components/AuthFormItem/AuthFormItem'

const Registrarion:React.FC = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false)

  const [firstNameErorr, setFirstNameErorr] = useState("Некорректное имя")
  const [firstNameDirty, setFirstNameDirty] = useState(false)

  const [lastNameErorr, setLastNameErorr] = useState("Некорректная фамилия")
  const [lastNameDirty, setLastNameDirty] = useState(false)

  const [phoneNumberErorr, setPhoneNumberErorr] = useState("Неккоректный номер")
  const [phoneNumberDirty, setPhoneNumberDirty] = useState(false)

  const [emailErorr, setEmailErorr] = useState("Неккоректный email")
  const [emailDirty, setEmailDirty] = useState(false)

  const [passwordErorr, setPasswordErorr] = useState("Пароль должен содержать не менее 8 символов")
  const [passwordDirty, setPasswordDirty] = useState(false)

  const [stateSecurityPolicy, setStateSecurityPolicy] = useState(false)

  const [registrationError, setRegistrationError] = useState(false)
  const [registrationErrorText, setRegistrationErrorText] = useState("")

  const firstName = useInput("")
  const lastName = useInput("")
  const phone = useInput("")
  const email = useInput("")
  const password = useInput("")

  const firstNameValue = firstName.value
  const lastNameValue = lastName.value
  const phoneNumberValue = phone.value
  const emailValue = email.value
  const passwordValue = password.value

  const dispatch = useAppDispatch()
  const {userAuth} = useAppSelector(state => state.auth)
  
  const navigate = useNavigate()

  useEffect(() => {
    if (userAuth) {
      navigate("/")
    }
  }, [userAuth])

  const genPassword = (e:any) => {
    e.preventDefault()
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let resPass = ""
    const passwordLength = 8

    chars.split("").forEach(char => {
      if (resPass.length < passwordLength) {
        const id = Math.floor(Math.random() * chars.length)
        resPass += chars[id]
      }
    });

    password.setValue(resPass)
    setPasswordDirty(false)
    setPasswordVisibility(true)

  }

  const validatePhoneNumber = ():void => {
    const val = /^[0-9\s]*$/
    if (!val.test(phone.value) && phone.value.length > 0) {
      setPhoneNumberDirty(true)
    } else {
      setPhoneNumberDirty(false)
    }
  }
  const validateEmail = ():void => {
    const val = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!val.test(email.value) && email.value.length > 0) {
      setEmailDirty(true)
    } else {
      setEmailDirty(false)
    }
  }
  const validatePassword = ():void => {
    const needPasswordLength = 8
    if (password.value.length < needPasswordLength && password.value.length > 0) {
      setPasswordDirty(true)
    } else {
      setPasswordDirty(false)
    }
  }
  const checkSecurityPolicy = (e:any) => {
    if (e.target.checked) {
      setStateSecurityPolicy(true)
    } else {
      setStateSecurityPolicy(false)
    }
  }

  const registration = (e:any) => {
    if (!firstNameDirty && firstName.value.length > 0
      && !lastNameDirty && lastName.value.length > 0
      && !phoneNumberDirty && phone.value.length > 0
      && !emailDirty && email.value.length > 0
      && !passwordDirty && password.value.length > 0
      && stateSecurityPolicy
    ) {
      e.preventDefault()
      dispatch(fetchRegistration({firstNameValue,
        lastNameValue,
        phoneNumberValue,
        emailValue,
        passwordValue}))
        // dispatch(setModalWindow(false))
    } else {
      e.preventDefault()
      setRegistrationErrorText("Введите все данные корректно и подтвердите пользовательское соглашение")
    }

  }

  return (
    <main>
      <div className="container">
      <div className='auth-window'>
      <h1 className='title'>Регистрация</h1>
      <div className='form'>
        <form action='#' className='form__checkout'>
          {firstNameDirty && <div style={{ color: "red", fontSize: "12px" }}>{firstNameErorr}</div>}
          <AuthFormItem
            label="Имя"
            id="formFirstName"
            type="text"
            name='firstName'
            placeholder="Федор"
            {...firstName}
          />
          {lastNameDirty && <div style={{ color: "red", fontSize: "12px" }}>{lastNameErorr}</div>}
          <AuthFormItem
            label="Фамилия"
            id="formLastName"
            type="text"
            name='lastName'
            placeholder="Федоров"
            {...lastName}
          />

          {phoneNumberDirty && <div style={{ color: "red", fontSize: "12px" }}>{phoneNumberErorr}</div>}
          <AuthFormItem
            label="Телефон"
            id="formPhoneNumber"
            type="text"
            name='phone'
            placeholder="79xxxxxx"
            onBlur={validatePhoneNumber}
            {...phone}
          />

          {emailDirty && <div style={{ color: "red", fontSize: "12px" }}>{emailErorr}</div>}
          <AuthFormItem
            label="Email"
            id="formEmail"
            type="text"
            name='email'
            placeholder="email"
            onBlur={validateEmail}
            {...email}
          />
          {passwordDirty && <div style={{ color: "red", fontSize: "12px" }}>
            {passwordErorr}
          </div>
          }
          <AuthFormItem
            label="Пароль"
            id="formPassword"
            type={passwordVisibility ? "text" : "password"}
            name='password'
            placeholder="*******"
            onBlur={validatePassword}
            {...password}
            children={passwordVisibility ?
              <EyeOffIcon className='showPass' onClick={(e) => setPasswordVisibility(false)} />
              :
              <EyeIcon onClick={(e) => setPasswordVisibility(true)} className='showPass' />
            }
          />
          
          {passwordDirty && <button className='generatePassword__btn'
            onClick={(e) => genPassword(e)}>
            Сгенерировать пароль
          </button>
          }
          <div className='options'>
            <div className='options__item'>
              <input onClick={(e) => checkSecurityPolicy(e)} id="checkAccept" className="checkbox" type="checkbox" />
              <label className="checkbox__title" htmlFor="checkAccept">
                Я согласен с
                <Link to={"/security-policy"} className='orng'> условиями обработки персональных данных</Link>
              </label>
            </div>
          </div>
          <div className='checkout'>
          <Link to="/login">Авторизация</Link>
            {registrationError || <div style={{ color: "red", fontSize: "12px" }}>{registrationErrorText}</div>}
            <button className='checkout__btn' type="submit" onClick={(e) => registration(e)}>Зарегистрироваться</button>
          </div>
        </form>
      </div >
    </div >
      </div>
    </main>
  )
}

export default Registrarion