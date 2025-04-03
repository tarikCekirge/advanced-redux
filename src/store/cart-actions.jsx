import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
    return async (dispatch) => {

        const fetchData = async () => {
            const response = await fetch('https://redux-demo-1da7e-default-rtdb.firebaseio.com/cart.json');

            if (!response.ok) {
                throw new Error('Fetching data failed!');
            }
            const data = response.json();
            return data;
        }


        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart(cartData))
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: error.message || ' Fetching data failed!'
            }));

        }




    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
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
};
