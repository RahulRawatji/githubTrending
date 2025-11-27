import { useEffect } from 'react'
import { useStore } from './store/store'

import Header from './components/Header'
import List from './components/List'
import { cacheStepup } from './api/utils';

import './App.css'
import getListItems from './api/getListItem';

function App() {

  const {addRepoData, currPage, repoData, setIsLoading} = useStore((state) => state);
 

  useEffect(() => {
    cacheStepup();
    setIsLoading();
    setStoreRepoData();
  }, [currPage])

  async function setStoreRepoData() {
    try {
      const localData = JSON.parse(localStorage.getItem('gitTData'));
      if (localData && currPage == 1) {
        addRepoData(localData);
      } else {
        const response = await getListItems(currPage);
        if (!response.error) {
          addRepoData([...repoData,...response.data.items]);
          if(currPage == 1){
            localStorage.setItem(`gitTData`, JSON.stringify([...response.data.items]))
          }       
        }
      }
    } catch (error) {
      console.log(error)
    }

  }

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
