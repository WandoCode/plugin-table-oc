import { getKeys } from '../utility/helpers'
import TableHeader from './TableHeader'
import { useDispatch, useSelector } from 'react-redux'
import { goToPage, sortTable } from '../app/table/Table.actions'

function TableHeaders() {
  const dispatch = useDispatch()
  const headers = useSelector((state) => state.table.headers)
  const showId = useSelector((state) => state.table.showId)
  const sorting = useSelector((state) => state.table.sorting)

  const handleSort = (e) => {
    const val = e.nativeEvent.path.find((el) =>
      el.dataset.sort ? true : false
    )

    const newSorting = { ...sorting }
    newSorting.direction =
      sorting.propriety === val.dataset.sort ? sorting.direction * -1 : 1
    newSorting.propriety = val.dataset.sort

    dispatch(sortTable(newSorting))
    dispatch(goToPage(1))
  }

  const headersDOM = () => {
    if (!headers) return
    const keys = getKeys(headers, showId)
    return keys.map((key) => {
      return (
        <th key={key} data-sort={key} onClick={handleSort}>
          {
            <TableHeader
              name={headers[key]}
              sorted={key === sorting.propriety}
              direction={sorting.direction}
            />
          }
        </th>
      )
    })
  }

  return (
    <thead>
      <tr>{headersDOM()}</tr>
    </thead>
  )
}

export default TableHeaders
