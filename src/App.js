import React, {useState, useEffect} from 'react'
// eslint-disable-next-line
import {Products, Navbar, Cart, CheckOut} from './components'
import {commerce} from './lib/commerce'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
function App() {
  // eslint-disable-next-line
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({})
  const [order, setOrder] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const fetchProduct = async ()=>{
    const {data} = await commerce.products.list()
    setProducts(data)
    
  }
  const fetchCart = async ()=>{
    const cart = await commerce.cart.retrieve()
    setCart(cart)
  }
  // eslint-disable-next-line
  const handleCart = async (productId, quantity)=>{
    const {cart} = await commerce.cart.add(productId, quantity)
    setCart(cart)
  }
  const handleUpdateCartQuantity = async (productId, quantity) =>{
    const {cart} = await commerce.cart.update(productId, {quantity})
    setCart(cart)
  }
  const handleRemoveFromCart = async (productId)=> {
    const {cart} = await commerce.cart.remove(productId)
    setCart(cart)
  }
  const handleEmptyCart = async () =>{
    const {cart} = await commerce.cart.empty()
    setCart(cart)
  }
  const refreshCart =async ()=>{
    const newCart = await commerce.cart.refresh()
    setCart(newCart)
  }
  const handleCheckOutCapture = async (checkOutTokenId, newOrder)=>{
    try {
      const incomingOrder = await commerce.checkout.capture(checkOutTokenId, newOrder)
      setOrder(incomingOrder)
      refreshCart()
    } catch (error) {
      setErrorMessage(error.data.error.message)
    }
  }
  useEffect(() => {
    fetchProduct()
    fetchCart()
  }, [])
  return(
    <Router>
      <div>
        <Navbar totalItem={cart.total_items}/>
        <Switch>
          <Route exact path="/">
          <Products products={products} handleCart={handleCart}/>
          </Route>
          <Route exact path="/cart">
            <Cart cart={cart} emptyCart={handleEmptyCart} removeCart={handleRemoveFromCart} updateCart={handleUpdateCartQuantity}/>
          </Route>
          <Route exact path="/checkout">
            <CheckOut
             cart={cart}
             order={order}
             onCaptureCheckOut={handleCheckOutCapture}
             error={errorMessage}
             />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
