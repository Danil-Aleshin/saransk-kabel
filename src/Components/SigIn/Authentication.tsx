import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'
import { FormEventHandler, KeyboardEventHandler, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import useInput from '../../hooks/useInput'
import { fetchAuthentication } from '../../store/AuthenticationSlice'
import AuthFormItem from '../AuthFormItem'
import Registrtion from './Registration'
import './SigIn.scss'

interface propsSigIn{
  setSigInWindowLog:React.Dispatch<React.SetStateAction<boolean>>,
  sigInWindowLog:boolean,
}

const Authentication:React.FC<propsSigIn> = ({ setSigInWindowLog, sigInWindowLog }) =>{
  const [regWin, setRegWin] = useState(false)
  const [passwordVisibility, setPasswordVisibility] = useState(false)

  const login = useInput("")
  const password = useInput("")

  const dispatch = useAppDispatch()
  const {error,status,userAuth} = useAppSelector(state => state.auth)

  const location = useLocation()

  useEffect(() => {
    if (sigInWindowLog) {
      document.body.classList.add("lock")
      document.addEventListener('keyup', closeModal);
    } else {
      document.body.classList.remove("lock")
    }

    return () => {
      document.removeEventListener('keyup', closeModal);
    }

  }, [sigInWindowLog])

  useEffect(() => {
    setSigInWindowLog(false)
    setRegWin(false)
  }, [location.pathname])

  useEffect(() => {
    if (status === "fulfield" && userAuth) {
      setSigInWindowLog(false)
      login.setValue("")
      password.setValue("")
    }
  }, [userAuth])
  

  const closeModal = (e:any) => {
    if (e.key === "Escape" || e.target.className === "overlay active") {
      setSigInWindowLog(false)
      setRegWin(false)
    }
  }
  const auth:FormEventHandler = (e) => {
    const loginValue = login.value
    const passwordValue = password.value
    e.preventDefault()
    dispatch(fetchAuthentication({loginValue,passwordValue}))
  }
  
  return (
    <div className={sigInWindowLog ? "overlay active" : "overlay"} onMouseDown={(e) => closeModal(e)}>
      
      {!regWin ? <div className='modalWindow'>
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
              {status === "rejected" && <div style={{ color: "red", fontSize: "12px", textAlign: "center" }}>{error}</div>}
              <a href="#">Забыли пароль?</a>
              <button className='checkout__btn' type='submit' onClick={(e) => auth(e)}>Войти</button>
              <a href="#" onClick={() => setRegWin(true)}>Регистрация</a>
            </div>
          </form>
        </div>
      </div> :
        <Registrtion 
        setSigInWindowLog={setSigInWindowLog} 
        regWin={regWin} 
        setRegWin={setRegWin}
        passwordVisibility={passwordVisibility}
        setPasswordVisibility={setPasswordVisibility}  
        />
      }
    </div>
  )
}
export default Authentication
