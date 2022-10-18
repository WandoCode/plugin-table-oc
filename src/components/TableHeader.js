import arrowUp from './caretup.svg'
import arrowDown from './caretdown.svg'
import { useSelector } from 'react-redux'

import { useState, useEffect } from 'react'

function TableHeader({ name, sorted, direction }) {
  const sort = useSelector((state) => state.table.sort)

  const [sortDirectionImg, setSortDirectionImg] = useState()

  useEffect(() => {
    setSortDirectionImg(constructSortImg(direction))
  }, [direction, sorted])

  const constructSortImg = (direction) => {
    const imgUp = <img src={arrowUp} alt="arrow up" className="arrow-up" />
    const imgDowm = (
      <img src={arrowDown} alt="arrow dowm" className="arrow-down" />
    )
    if (!sorted)
      return (
        <>
          {imgUp}
          {imgDowm}
        </>
      )
    if (sorted && direction === 1) return <>{imgUp}</>
    if (sorted && direction === -1) return <>{imgDowm}</>
  }

  return (
    <div className="tableHeader">
      <div>{name}</div>
      {sort && <div className="sorting-direction">{sortDirectionImg}</div>}
    </div>
  )
}

export default TableHeader
