import { useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import List from './components/List'
import { cacheStepup } from './api/utils'

function App() {

  useEffect(()=>{
    cacheStepup()
  },[])

  return (
    <>
      <div className='md:px-25'>
        <Header />
        <List />
        <div className='mt-2'>
          <p className='text-center font-mono'>Listing Trending github repos for the day</p>
        </div>
      </div>
    </>
  )
}

export default App
