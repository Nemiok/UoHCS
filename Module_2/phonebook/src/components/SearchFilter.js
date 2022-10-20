import React from "react"

const SearchFilter = (props) => {
  return (
    <div>
      filter shown with<input onChange={props.handleSearchInput} />
    </div>
  )
}

export default SearchFilter
