import Table from './components/Table'
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
      <Table
        headers={headers}
        datas={datas}
        scroll={false}
        showId={false}
        defaultItemsByPage={20}
        defaultSort="state"
        sort={true}
      />
    </div>
  )
}

export default App
// TODO: lors d'une recherche ou d'un changement de nombre d'items par page: on revient à la page 1
// TODO: Passer les états à redux
//TODO: Ecrire les test (unitaire + cypress)
