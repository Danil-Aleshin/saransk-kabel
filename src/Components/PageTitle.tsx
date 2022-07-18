import React, { memo } from 'react'


interface propsPageTitle{
  text:string
}
const PageTitle:React.FC<propsPageTitle> = memo(({text}) => {
  return (
    <div className="page-title">
      <h2>{text}</h2>
    </div>
  )
})

export default PageTitle