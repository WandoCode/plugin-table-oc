import Table from './components/Table'
import data from './mock/mock-employees.json'
function App() {
  const headers = {
    //
    id: 'id',
    //
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
      <Table headers={headers} datas={data} />
    </div>
  )
}

export default App
