import { useState, useEffect } from 'react'

function Navigation({ onNextPage, onPrecPage, currentPage, totalPage }) {
  const [pages, setPages] = useState()

  useEffect(() => {
    setPages(buildPages())
  }, [totalPage, currentPage])

  const buildPages = () => {
    let pagesArray = []
    for (let i = 1; i <= totalPage; i++) {
      pagesArray.push(
        <button
          key={i}
          className={i === currentPage ? 'pages--active pages' : 'pages'}
        >
          {i}
        </button>
      )
    }
    return pagesArray
  }

  return (
    <div className="table-nav">
      <button onClick={onPrecPage}> {'<'}</button>
      {pages}
      <button onClick={onNextPage}> {'>'}</button>
    </div>
  )
}

export default Navigation
