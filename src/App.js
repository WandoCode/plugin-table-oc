import TableIndex from './components/index'
import datas from './mock/mock-employees.json'

function App() {
  const headers = {
    id: 'ID',
    firstName: 'First Name',
    lastName: 'Last Name',
    startDate: 'Start Date',
    department: 'Department',
    birthDate: 'Date of Birth',
    street: 'Street',
    city: 'City',
    state: 'State',
    zipCode: 'Zip Code',
  }
  return (
    <div className="app">
      <TableIndex
        headers={headers}
        datas={datas}
        scroll={true}
        showId={true}
        defaultItemsByPage={20}
        defaultSort="state"
        sort={false}
      />
    </div>
  )
}

export default App
//TODO: Ecrire les test (unitaire + cypress)
//TODO: Ecrire la documentation
