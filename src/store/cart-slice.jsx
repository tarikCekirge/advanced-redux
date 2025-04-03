import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalQuantity: 0,
    changed: false
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        replaceCart: (state, action) => {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addToCart: (state, action) => {
            const { id, name, price, quantity } = action.payload;
            state.changed = true;
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
            state.changed = true;
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


export const cartActions = cartSlice.actions;
export default cartSlice