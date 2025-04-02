import { createSlice } from "@reduxjs/toolkit";


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
            const existingItem = state.cartItems.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity += quantity;
                existingItem.totalPrice = existingItem.quantity * existingItem.price;
            } else {
                state.cartItems.push({
                    id,
                    name,
                    price,
                    quantity,
                    totalPrice: price * quantity,
                });
            }
        },

        removeItemFromCart: () => { }
    }

})

export const cartActions = cartSlice.actions;
export default cartSlice