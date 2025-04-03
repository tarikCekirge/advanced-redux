import React, { useEffect } from 'react'
import Layout from './components/Layout/Layout'
import Cart from './components/Cart/Cart'
import Products from './components/Shop/Products'
import { useDispatch, useSelector } from 'react-redux'
import { uiActions } from './store/ui-slice'
import Notification from './components/UI/Notification'

let isInitial = true;

const App = () => {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data'
      }));

      try {
        const response = await fetch(
          'https://redux-demo-1da7e-default-rtdb.firebaseio.com/cart.json',
          {
            method: 'PUT',
            body: JSON.stringify(cart),
            headers: { 'Content-Type': 'application/json' }
          }
        );

        if (!response.ok) {
          throw new Error('Sending cart data failed!');
        }

        dispatch(uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully'
        }));
      } catch (error) {
        dispatch(uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: error.message || 'Sending cart data failed!'
        }));
      }
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData();
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
