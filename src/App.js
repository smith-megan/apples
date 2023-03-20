import './App.css';
import {useState} from 'react'
import Home from './Components/Home/Home'
import View from './Components/View/View'
import Item from './Components/Item/Item'
import Nav from './Components/Nav/Nav'
import Cart from './Components/Cart/Cart'
import {BrowserRouter as Router} from 'react-router-dom'

import {Routes, Route} from 'react-router-dom'

function App() {
  const [shoppingCart, setShoppingCart]=useState([])

  const addToCart=(orderedItem)=>{
    const checkInCart = shoppingCart.find(item=>item.id === orderedItem.id)

    if (checkInCart){
      setShoppingCart(shoppingCart.map((item)=>item.id===orderedItem.id ? {...checkInCart, quantity: checkInCart.quantity += 1 } : item))
    } else {
      setShoppingCart([...shoppingCart, {...orderedItem, quantity: 1}])
    }
  }

  const removeFromCart=(orderedItem)=>{
    const checkInCart = shoppingCart.find(item=>item.id === orderedItem.id)

    if (checkInCart){
      if(checkInCart.quantity>1){
      setShoppingCart(shoppingCart.map((item)=>item.id===orderedItem.id ? {...checkInCart, quantity: checkInCart.quantity -= 1 } : item))
    } else{
      setShoppingCart(shoppingCart.filter((item)=>item.id!==orderedItem.id))      
    }} 
  }

  return (
    <div className="App">
      <Router>
        <Nav/>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/shop' element={<View shoppingCart={shoppingCart} addToCart={addToCart}/>}></Route>
          <Route exact path='/cart' element={<Cart shoppingCart={shoppingCart} addToCart={addToCart} removeFromCart={removeFromCart}/>}></Route>
          <Route exact path='/item/:id' element={<Item shoppingCart={shoppingCart} addToCart={addToCart}/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;