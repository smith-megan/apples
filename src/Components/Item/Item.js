import React, {useState, useEffect} from 'react'
import axios from 'axios';
import noPhoto from '../../Images/no-photo-road.png'
import {useParams} from "react-router-dom";
import './Item.css'


function Item({addToCart}) {
const [specific, setSpecific]=useState({price: 0,releated:[]})
const itemId=useParams()

  useEffect(()=>{
    axios.get('https://sweet-apple-acres.netlify.app/.netlify/functions/api/products/'+itemId.id).then(res=>{
      setSpecific(res.data)
    })
  },[setSpecific, itemId.id])

  return (
  <div>
    <div className='item-master-div'>
      <div className='item-div' key={specific?.id}>
        <div style={{
          backgroundImage: `url(${specific.image?specific.image:noPhoto})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          height: '400px',
          borderRadius: '15px',
        }}></div>
        <div className='item-info'>
          <div className='item-info-details'>
            <h1 className='item-title'>{specific.name}</h1>
            <p>{specific.description}</p>
            <p>Rating {specific.rating}</p>
            <p>${specific.price.toFixed(2)}</p>
          </div>
          <button onClick={()=>{addToCart(specific)}}>Add to Cart</button>
        </div>
        <p>{specific?.releated.map((item)=>{return(<div>Related: {item?.name}</div>)})}</p>
      </div>
    </div>
  </div>
  )
}

export default Item