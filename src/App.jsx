import './App.css'
import Header from './components/Header'
import List from './components/List'

function App() {
  console.log(new Date())
  return (
    <>
    <div className='md:px-25'>
      <Header/>
    <List/>
    </div>
    </>
  )
}

export default App
