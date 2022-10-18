import { getKeys } from '../utility/helpers'
import TableHeader from './TableHeader'
import { useSelector } from 'react-redux'

function TableHeaders({ sorting, onSorting }) {
  const headers = useSelector((state) => state.table.headers)
  const sort = useSelector((state) => state.table.sort)
  const showId = useSelector((state) => state.table.showId)

  const handleSort = (e) => {
    const val = e.nativeEvent.path.find((el) =>
      el.dataset.sort ? true : false
    )
    const newSorting = { ...sorting }
    newSorting.direction =
      sorting.propriety === val.dataset.sort ? sorting.direction * -1 : 1
    newSorting.propriety = val.dataset.sort
    onSorting(newSorting)
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
              sort={sort}
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
