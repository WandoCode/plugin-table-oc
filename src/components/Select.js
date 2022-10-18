import { useState } from 'react'
import arrowUp from './caretup.svg'
import arrowDown from './caretdown.svg'
import OutsideClickHandler from 'react-outside-click-handler'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentItemsByPage, goToPage } from './Table.actions'

function Select({ name }) {
  const dispatch = useDispatch()

  const choicesArray = useSelector((state) => state.table.itemsByPageArr)
  const currentItemsByPage = useSelector(
    (state) => state.table.currentItemsByPage
  )

  const [openMenu, setOpenMenu] = useState(false)

  const handleInput = (e) => {
    dispatch(setCurrentItemsByPage(e.target.value))
    dispatch(goToPage(1))
    setOpenMenu(false)
  }

  const choicesOptions = choicesArray.map((choice) => {
    return (
      <label htmlFor={choice} key={choice} className="select__label">
        <input
          type="radio"
          name={name}
          id={choice}
          onChange={handleInput}
          value={choice}
        />
        {choice}
      </label>
    )
  })

  const handleBtnClick = () => {
    setOpenMenu(openMenu ? false : true)
  }

  return (
    <OutsideClickHandler
      display="contents"
      onOutsideClick={() => {
        setOpenMenu(false)
      }}
    >
      <div className="select">
        <button
          type="button"
          onClick={handleBtnClick}
          className="select__selected"
        >
          {currentItemsByPage}
          {openMenu ? (
            <img src={arrowUp} alt="arrow up" />
          ) : (
            <img src={arrowDown} alt="arrow down" />
          )}
        </button>
        {openMenu && <div className="select-options">{choicesOptions}</div>}
      </div>
    </OutsideClickHandler>
  )
}

export default Select
