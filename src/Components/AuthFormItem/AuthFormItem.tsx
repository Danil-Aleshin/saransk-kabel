import React, { memo } from 'react'
import './AuthFormItem.scss'

interface propsAuthFormItem{
  label:string,
  id:string,
  name:string,
  placeholder:string,
  type:string,
  value:string,
  onChange:React.ChangeEventHandler,
  onBlur?:()=>void,
  children?:JSX.Element
}

const AuthFormItem:React.FC<propsAuthFormItem> = 
  memo(({label,id,name,placeholder,type,value,onChange,onBlur,children}) => {
  return (
    <div className='auth__form__input'>
    <label htmlFor={id}>{label}</label>
    <input
      value={value}
      onChange={onChange}
      autoComplete="off" 
      type={type} id={id}
      onBlur={onBlur} 
      name={name} 
      placeholder={placeholder} 
      />
      {children}
  </div>
  )
})

export default AuthFormItem