import {  useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import Rotas from './routes/Rotas';

import IntraneLayout from './modulos/intranet/IntranetLayout'

function App() {

  const navigate = useNavigate()

  useEffect(() => {
    navigate('/')
  }, [])

  return (
    
    <div className='app-main'>
        <Rotas />
        {/* <IntraneLayout /> */}
    </div>
    )
  }

  export default App;
