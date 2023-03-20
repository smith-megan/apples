import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './View.css';
import noPhoto from '../../Images/no-photo-road.png'
import {useNavigate} from 'react-router-dom'

function View({addToCart}) {
  let navigate=useNavigate()
  const [browse, setBrowse] = useState([])

  const [searchTerm, setSearchTerm] = useState("")
  const [minRating, setMinRating] = useState(0)
  const [maxRating, setMaxRating] = useState(5)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(500)
  const [isAvailable, setIsAvailable] = useState(true)
  const [limit, setLimit] = useState(20)
  const [offset, setOffset]= useState(0)
  const [orderBy, setOrderBy] = useState("name")
  const [sort, setSort] = useState("DESC")
  
  useEffect(()=>{
    axios.get('https://sweet-apple-acres.netlify.app/.netlify/functions/api/products').then(res=>{
      setBrowse(res.data)
    })
  },[])

  const sendSearch= ()=>{
    axios.get(`https://sweet-apple-acres.netlify.app/.netlify/functions/api/products`, {
    params:{
      search: searchTerm,
      minRating: minRating,
      maxRating: maxRating,
      minPrice: minPrice,
      maxPrice: maxPrice,
      isAvailable: isAvailable,
      limit: limit,
      offset: offset,
      orderBy: orderBy,
      sort: sort,
    },
  }).then(res=>{
      setBrowse(res.data)
    })
  }

  return (
  <div>
    <div className='search-div'>
      <p className='search-title'>Browsing Options</p>
      <form className='search-form' onSubmit={(e)=>{e.preventDefault()
        sendSearch()}}>
      <div className='search-form-options'>
        <div>
          <label>
            Search:
            <input onChange={(e)=>{
              setSearchTerm(e.target.value)
            }} />
          </label>
        </div>
        <div>
          <div>          
            <p>Price: </p>
            <div className='search-form-options-column'>
              <label>
                Min
                <input className="small-input"onChange={(e)=>{setMinPrice(e.target.value)}} type="number"/>
              </label>
              <label>
                Max
                <input className="small-input" onChange={(e)=>{setMaxPrice(e.target.value)}} type="number"/>
              </label>
            </div>
          </div>
          <div>
            <p>Rating: </p>
            <div className='search-form-options-column'>
              <label>
                Min
                <input className="small-input" onChange={(e)=>{setMinRating(e.target.value)}} type="number"/>
              </label>
              <label>
                Max
                <input className="small-input" onChange={(e)=>{setMaxRating(e.target.value)}} type="number"/>
              </label>
            </div>
          </div>
        </div>
        <div>
          <div>
            <label>
              Arrange By
              <select onChange={(e)=>{setOrderBy(e.target.value)}}>
                <option value="name">Name</option>
                <option value="price">Price</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Number to Display
              <input className="small-input" onChange={(e)=>{setLimit(e.target.value)}} type="number" />
            </label>
          </div>
        <div>
          <label>
            Change Sort Direction
            <input onChange={(e)=>{(sort==="DESC") ? setSort("ASC") : setSort("DESC")}} type="checkbox"/>
          </label>
        </div>
        <div>
          <label>
            Available Now
            <input onChange={(e)=>{setIsAvailable(!isAvailable)}} defaultChecked="true" type="checkbox"/>
          </label>
        </div>
        </div>
        <input className="search-btn" type="submit" value="Submit" />
        </div>
      </form>
    </div>
    <div className='shop-master-div'>
      {browse.map(item => {return <div className='shop-item-div' key={item.id}>
        <div style={{
          backgroundImage: `url(${item.image?item.image:noPhoto})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          height: '200px',
          borderRadius: '5%',
          cursor: 'pointer',
        }} 
        onClick={()=>{navigate(`../item/${item.id}`)}}
        ></div>
        <div className='shop-item-info'>
          <div className='shop-item-info-details'>
            <h1 className='shop-item-title' onClick={()=>{navigate(`../item/${item.id}`)}}>{item.name}</h1>
            <p>Rating {item.rating}</p>
            <p>${item.price.toFixed(2)}</p>
          </div>
          <button onClick={()=>{addToCart(item)}}>Add to Cart</button>
        </div>
      </div>
      })}
    </div>
  </div>
  )
}

export default View