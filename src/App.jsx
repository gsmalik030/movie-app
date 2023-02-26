import { useState, useEffect } from 'react'
import getData from './utils/api.js'

function App() {
  
  useEffect(() => {
    apiTest();
  }, [])

  const apiTest = async () => {
    const data = await getData("/movie/popular");
  }

  return (
    <div className="App">App
    </div>
  )
}

export default App
