import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/appRedux";
import { TypeSetState } from "../../types/data";
import "./ModalWindow.scss"

interface propsModalWindow{
  children:JSX.Element,
  modalWindowState:boolean,
  setModalWindowState:TypeSetState<boolean>
}

const ModalWindow:React.FC<propsModalWindow> = ({modalWindowState,setModalWindowState,children}) => {

  const dispatch = useAppDispatch()

  const location = useLocation()

  useEffect(() => {
    if (modalWindowState) {
      document.body.classList.add("lock")
      document.addEventListener('keyup', closeModal);
    } else {
      document.body.classList.remove("lock")
    }

    return () => {
      document.removeEventListener('keyup', closeModal);
    }

  }, [modalWindowState])

  useEffect(() => {
    setModalWindowState(false)
  }, [location.pathname])

  const closeModal = (e:any) => {
    if (e.key === "Escape" || e.target.className === "overlay active") {
      setModalWindowState(false)
    }
  }
  return (
    <div className={modalWindowState ? "overlay active" : "overlay"} onMouseDown={(e) => closeModal(e)}>
      {children}
    </div>
  )
}

export default ModalWindow