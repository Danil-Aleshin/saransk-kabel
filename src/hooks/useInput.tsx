import React, { memo, useMemo, useState } from 'react'

interface useInputReturn{
  value:string,
  onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void,
  setValue:React.Dispatch<React.SetStateAction<string>>
}

const useInput = (initialState:string = ""):useInputReturn => {

  const [value,setValue] = useState(initialState)

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setValue(e.target.value)
  }

  return {
    value,
    onChange,
    setValue,
  }
}

export default useInput



