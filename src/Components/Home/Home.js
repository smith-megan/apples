import React from 'react'
import './Home.css'
import {useNavigate} from 'react-router-dom'

function Home() {
  let navigate=useNavigate()

  return (
  <div className='home'>  
    <div className='home-text'>
      <div className='home-details'>
        <h1 className='home-title'>Welcome to Sweet Apple Acres</h1>
        <p>The best place for bulk produce orders</p>
        <button onClick={()=>{navigate(`../shop`)}} className='home-button'>Take a Look Around</button>
      </div>
      <div className='home-image'></div>
    </div>
  </div>    
  )
}

export default Home