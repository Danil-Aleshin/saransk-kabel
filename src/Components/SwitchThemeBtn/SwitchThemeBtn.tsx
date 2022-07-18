import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import { setTheme } from '../../store/ThemeSlice'
import './SwitchThemeBtn.scss'

const SwitchThemeBtn = () => {

  const currentTheme = useAppSelector(state => state.theme.theme)
  const dispatch = useAppDispatch()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme)

  }, [currentTheme])

  
  return (
    <div
      className={currentTheme === "light" ?
        "switch-theme-btn light" : "switch-theme-btn dark"}
      onClick={() => dispatch(setTheme())}
    >
    </div >
  )
}

export default SwitchThemeBtn