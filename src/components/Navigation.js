import { useState, useEffect } from 'react'

function Navigation({
  onNextPage,
  onPrecPage,
  currentPage,
  totalPage,
  onCustomPage,
}) {
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
          onClick={() => onCustomPage(i)}
        >
          {i}
        </button>
      )
    }
    return pagesArray
  }

  return (
    <div className="table-nav">
      <button onClick={onPrecPage} disabled={currentPage - 1 <= 0}>
        {' '}
        {'<'}
      </button>
      {pages}
      <button onClick={onNextPage} disabled={currentPage + 1 > totalPage}>
        {' '}
        {'>'}
      </button>
    </div>
  )
}

export default Navigation
