import '../style/index.css'
import ScrollTable from './ScrollTable'
import PagesTables from './PagesTable'
import { useDispatch } from 'react-redux'
import {
  setDefaultItemsByPage,
  setDefaultSort,
  setHeaders,
  setItemsByPage,
  setSearch,
  setShowId,
  setSort,
} from './Table.actions'

// Il faut fournir un objet pour le nom des colonnes
// Datas est un array d'objet. Chaque objet a un id unique.
// Les champs des objets datas sont des strings
// Pas de sorting si infinite scroll
function Table({
  headers,
  datas,
  defaultItemsByPage = 5,
  itemsByPage = [5, 20, 50],
  scroll = false,
  defaultSort = '',
  sort = true,
  search = true,
  showId = false,
}) {
  const dispatch = useDispatch()
  dispatch(setSearch(search))
  dispatch(setHeaders(headers))
  dispatch(setDefaultItemsByPage(defaultItemsByPage))
  dispatch(setItemsByPage(itemsByPage))
  dispatch(setDefaultSort(defaultSort))
  dispatch(setShowId(showId))
  dispatch(setSort(sort))

  if (scroll)
    return (
      <ScrollTable
        headers={headers}
        datas={datas}
        defaultItemsByPage={defaultItemsByPage}
        defaultSort={defaultSort}
        sort={sort}
        showId={showId}
      />
    )
  else
    return (
      <PagesTables
        headers={headers}
        datas={datas}
        defaultItemsByPage={defaultItemsByPage}
        itemsByPage={itemsByPage}
        defaultSort={defaultSort}
        sort={sort}
        search={search}
        showId={showId}
      />
    )
}

export default Table
