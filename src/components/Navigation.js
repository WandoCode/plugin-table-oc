import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

function Navigation({ onNextPage, onPrecPage, totalPage, onCustomPage }) {
  const currentPage = useSelector((state) => state.table.currentPage)
  const [pages, setPages] = useState()

  useEffect(() => {
    setPages(buildPages())
  }, [totalPage, currentPage])

  const buildPages = () => {
    let pagesArray = []
    let baseClass = 'navigation__btn navigation__page'
    for (let i = 1; i <= totalPage; i++) {
      pagesArray.push(
        <button
          key={i}
          className={
            i === currentPage
              ? baseClass + ' navigation__page--active'
              : baseClass
          }
          onClick={() => onCustomPage(i)}
        >
          {i}
        </button>
      )
    }
    return pagesArray
  }

  return (
    <div className="navigation">
      <button
        className="navigation__btn"
        onClick={onPrecPage}
        disabled={currentPage - 1 <= 0}
      >
        Prec
      </button>
      {pages}
      <button
        className="navigation__btn"
        onClick={onNextPage}
        disabled={currentPage + 1 > totalPage}
      >
        Next
      </button>
    </div>
  )
}

export default Navigation
