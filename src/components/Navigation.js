import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { goToPage } from './Table.actions'
import { getNextPage } from './utility/helpers'

function Navigation({ totalPage }) {
  const dispatch = useDispatch()
  const currentPage = useSelector((state) => state.table.currentPage)

  const [pages, setPages] = useState()

  useEffect(() => {
    setPages(buildPages())
  }, [totalPage, currentPage])

  const handlePrecPage = () => {
    const newCurrPage = currentPage - 1 > 0 ? currentPage - 1 : currentPage
    dispatch(goToPage(newCurrPage))
  }

  const handleNextPage = () => {
    const newCurrPage = getNextPage(currentPage, totalPage)
    dispatch(goToPage(newCurrPage))
  }

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
          onClick={() => dispatch(goToPage(i))}
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
        onClick={handlePrecPage}
        disabled={currentPage - 1 <= 0}
      >
        Prec
      </button>
      {pages}
      <button
        className="navigation__btn"
        onClick={handleNextPage}
        disabled={currentPage + 1 > totalPage}
      >
        Next
      </button>
    </div>
  )
}

export default Navigation
