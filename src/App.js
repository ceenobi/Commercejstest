import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {Products, Navbar, Cart, Checkout, Modal} from './components'
import {commerce} from './lib/Commerce'
import {useState, useEffect} from 'react'


function App() {
  const [products, setProducts] = useState([]);
  // const [produce, setProduce] = useState([])

  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState(''); 
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  
  const fetchProducts = async () => {
  const { data } = await commerce.products.list();
    setProducts(data);
  }
  //  const produce = async (productsId) => {
  //    const item = await commerce.products(productsId);
  //    setProducts(item.products)
  //  }


   const fetchCart = async () => {
      setCart(await commerce.cart.retrieve()); 
   }

   const handleAddToCart = async (productId, quantity) => {
     const item = await commerce.cart.add(productId, quantity);
     setCart(item.cart);
   }

   const handleUpdateCartQty = async (productId, quantity) => {
     const item = await commerce.cart.update(productId, {quantity});
     setCart(item.cart);
   }

   const handleRemoveFromCart = async (productId) => {
     const item = await commerce.cart.remove(productId);
     setCart(item.cart);
   }

   const handleEmptyCart = async () => {
     const item = await commerce.cart.empty();
     setCart(item.cart);
   }

   const refreshCart = async () => {
     const newCart = await commerce.cart.refresh()
     setCart(newCart);
   }

   const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
     try {
       const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
       setOrder(incomingOrder);
       refreshCart();
       
     } catch (error) {
       setErrorMessage(error.data.error.message)
       
     }
   }

console.log(cart)

  useEffect (() => {
    fetchProducts();
    fetchCart();
  }, [])
 
  
  return (
    <Router>
      <Navbar totalItems={cart.total_items} />
      <Switch>
        <Route exact path='/'>
          <Products products={products} onAddToCart={handleAddToCart}/>
        </Route>
        <Route path='/cart'>
          <Cart
            cart={cart}
            handleUpdateCartQty={handleUpdateCartQty}
            handleRemoveFromCart={handleRemoveFromCart}
            handleEmptyCart={handleEmptyCart}
          />
        </Route>
        <Route path='/checkout'>
          <Checkout
            cart={cart}
            order={order}
            onCaptureCheckout={handleCaptureCheckout}
            error={errorMessage}
          />
        </Route>
      </Switch>
      {/* <Modal
        products={products}
        onAddToCart={handleAddToCart} 
        show={show} 
        handleShow={handleShow} 
        handleClose={handleClose}   
      /> */}
    </Router>
  )
}

export default App;
