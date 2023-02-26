import { useState, useEffect } from 'react'
import getData from './utils/api.js'
import { useSelector, useDispatch } from 'react-redux';
import { setUrl } from './store/homeSlice.js';
function App() {
  const dispatch = useDispatch();
  const url = useSelector(state => state.home.url);

  useEffect(() => {
    apiTest();
  }, [])

  const apiTest = async () => {
    const data = await getData("/movie/popular");
    dispatch(setUrl(data))
  }

  return (
    <div className="App">App
    {url?.total_pages}
    </div>
  )
}

export default App
