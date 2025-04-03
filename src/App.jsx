import React, { useEffect } from 'react'
import Layout from './components/Layout/Layout'
import Cart from './components/Cart/Cart'
import Products from './components/Shop/Products'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/UI/Notification'
import { fetchCartData, sendCartData } from './store/cart-actions'

let isInitial = true;

const App = () => {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData())
  }, [])
  useEffect(() => {
    if (isInitial) {
      isInitial = false
      return
    }

    dispatch(sendCartData(cart))

  }, [cart, dispatch]);

  return (
    <>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}

        <Products />
      </Layout>
    </>
  )
}

export default App
