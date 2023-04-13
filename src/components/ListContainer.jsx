import React from 'react'
import SearchForm from './SearchForm'
import CardList from './CardList/CardList'

const ListContainer = () => {
  return (
    <div className='bg-[#f7f8f9] p-5'>
        <SearchForm />
        <CardList />
    </div>
  )
}

export default ListContainer