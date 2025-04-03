import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const initialState = {
    items: [],
    totalQuantity: 0
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id, name, price, quantity } = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity += quantity;
            if (existingItem) {
                existingItem.quantity += quantity;
                existingItem.totalPrice = existingItem.quantity * existingItem.price;
            } else {
                state.items.push({
                    id,
                    name,
                    price,
                    quantity,
                    totalPrice: price * quantity,
                });
            }
        },

        removeItemFromCart: (state, action) => {
            const { id, quantity } = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity -= quantity;
            if (existingItem) {
                if (existingItem.quantity > quantity) {
                    existingItem.quantity -= quantity;
                    existingItem.totalPrice = existingItem.quantity * existingItem.price;
                } else {
                    state.items = state.items.filter(item => item.id !== id);
                }
            }
        }

    },


})

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

export const cartActions = cartSlice.actions;
export default cartSlice