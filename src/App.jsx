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
      <div className='lg:px-[25%] md:px-[10%]'>
        <Header />
        <List />
        <div className='mt-2'>
          <p className='text-center font-mono'>The most starred GitHub projects created in the last 10 days.</p>
        </div>
      </div>
    </>
  )
}

export default App
