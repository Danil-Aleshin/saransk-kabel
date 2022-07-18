import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './SearchInput.scss'

interface propsSearchInput{
  searchValue:string,
  setSearchValue:(value:string)=> void,
}

const SearchInput:React.FC<propsSearchInput> = ({searchValue,setSearchValue}) => {
  const location = useLocation()

  useEffect(() => {
    setSearchValue("")
  }, [location.pathname])

  return (
    <form className="search-product" action="">
      <input
        placeholder="Поиск"
        value={searchValue}
        type="text"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <svg className='search__icon' width={11} height={11} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </form>
  )
}

export default SearchInput
