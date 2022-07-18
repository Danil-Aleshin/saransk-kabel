import React, { memo } from 'react'
import { TypeSetState } from '../../types/data'

interface propsChangeValueForm{
  value:number,
  setValue:TypeSetState<number>
}

const ChangeValueForm:React.FC<propsChangeValueForm> = memo(({value,setValue}) => {
  return (
    <form>
    <button type='button' className='changeMeters__button'
      onClick={() => setValue(value - 1)}>-</button>
    <input
      id="lenght"
      min={1}
      type="number"
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      className="lenght"
    />
    <button type='button' className='changeMeters__button'
      onClick={(e) => setValue(value + 1)}>+</button>
  </form>
  )
})

export default ChangeValueForm