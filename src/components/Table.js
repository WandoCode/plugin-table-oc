import { useState, useEffect, useCallback, useRef } from 'react'

import '../style/index.css'
import TableHeader from './TableHeader'
import useFilterDatas from './hooks/useFilterDatas'
import useGetDatasToDisplay from './hooks/useGetDatasToDisplay'
import useRows from './hooks/useRows'
import useTotalPages from './hooks/useTotalPages'
import { getKeys } from '../utility/helpers'
import useSort from './hooks/useSort'
import ScrollTable from './ScrollTable'
import PagesTables from './PagesTable'

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
