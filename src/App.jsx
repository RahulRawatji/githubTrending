import { useEffect } from 'react'
import { useStore } from './store/store'

import Header from './components/Header'
import List from './components/List'
import { cacheStepup } from './api/utils';

import './App.css';

function App() {

  const {addRepoData, currPage, setIsLoading} = useStore((state) => state);

  useEffect(() => {
    cacheStepup();
    setIsLoading();
    addRepoData();
  }, [currPage])

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
