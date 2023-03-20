import React, {useState} from 'react'
import axios from 'axios';
import noPhoto from '../../Images/no-photo-road.png'
import {useNavigate} from 'react-router-dom'
import './Cart.css'

function Cart({shoppingCart, addToCart, removeFromCart}) {
  let navigate=useNavigate()

  const [name, setName]=useState("")
  const [address, setAddress]=useState("")
  const totalCart=shoppingCart.reduce((total, item) => total + (+item.price * +item.quantity), 0)

const handleCheckout=()=>{
  const order={
    name: name,
    deliveryAddress: address,
    items: [...shoppingCart.map((item)=>{return{productId: item.id, quantity: item.quantity}})]
  }

  axios.post('https://sweet-apple-acres.netlify.app/.netlify/functions/api/orders/', {order}, {headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'authorization': 'Basic token',
  }}).then(res=>{console.log(res)
    }).catch(function (error) {
    console.log(error);
  })
}

  return (
  <div>
    <div className='cart-master-div'>
    {shoppingCart.map((item)=>{return(
      <div className='cart-div' key={item?.id}>
        <div style={{
          backgroundImage: `url(${item.image?item.image:noPhoto})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          height: '150px',
          borderRadius: '5px',
        }} onClick={()=>{
          navigate(`../item/${item.id}`)
        }}></div>
        <div className='cart-info'>
          <div className='cart-info-details'>
            <h1>{item.name}</h1>
            <p>price per item: ${item.price}</p>
            <p>
              quantity: <button className='add-remove-btn' onClick={()=>{removeFromCart(item)}}>-</button>{item.quantity}<button className='add-remove-btn' onClick={()=>{addToCart(item)}}>+</button>
            </p>
            <p>item total: ${(item.price*item.quantity).toFixed(2)}</p>
          </div>
        </div>
      </div>)
      })
    }
    <form className='cart-submit-form' onSubmit={(e)=>{e.preventDefault()
      handleCheckout()}}>
      <div>
        <p>total: ${totalCart.toFixed(2)}</p>
      </div>
      <label>
        Name
        <input required={true} onChange={(e)=>{setName(e.target.value)}}></input>
      </label>
      <label>
        Address
        <input required={true} onChange={(e)=>{setAddress(e.target.value)}}></input>
      </label>
      <input className='checkout-btn' type="submit" value="Checkout"></input>
    </form>
    </div>
  </div>
  )
}

export default Cart