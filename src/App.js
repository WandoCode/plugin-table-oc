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
        search={true}
        itemsByPage={[10, 20, 30]}
        defaultItemsByPage={20}
      />
    </div>
  )
}

export default App
