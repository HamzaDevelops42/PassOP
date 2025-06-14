import { useState } from 'react'
import Nabar from './components/nabar'
import Manager from './components/Manager'

function App() {


  return (
    <div className='bg-green-50 min-h-screen'>
    <Nabar/>
    <Manager/>
    </div>
  )
}

export default App


// Color Pellete
// 7F8CAA grey (nabar)
// 333446 body(darker)
// B8CFCE (lighter)
// EAEFEF (lightest)