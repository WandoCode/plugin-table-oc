import { Provider } from 'react-redux'
import { store } from '../app/redux-store'
import Table from './Table'

function TableIndex({
  headers,
  datas,
  defaultItemsByPage,
  itemsByPageArr,
  scroll,
  defaultSort,
  sort,
  search,
  showId,
}) {
  return (
    <Provider store={store}>
      <Table
        headers={headers}
        datas={datas}
        defaultItemsByPage={defaultItemsByPage}
        itemsByPageArr={itemsByPageArr}
        scroll={scroll}
        defaultSort={defaultSort}
        sort={sort}
        search={search}
        showId={showId}
      />
    </Provider>
  )
}

export default TableIndex
