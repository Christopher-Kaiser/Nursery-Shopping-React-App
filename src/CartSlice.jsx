/* eslint-disable react-refresh/only-export-components */
import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.name === newItem.name);
      
      if (existingItem) {
        // If item already exists, increment quantity
        existingItem.quantity += 1;
      } else {
        // If item doesn't exist, add it with quantity 1
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const itemToRemove = action.payload;
      // Remove item from cart based on name
      state.items = state.items.filter(item => item.name !== itemToRemove.name);
    },
    updateQuantity: (state, action) => {
      const { item, newQuantity } = action.payload;
      const existingItem = state.items.find(cartItem => cartItem.name === item.name);
      
      if (existingItem) {
        if (newQuantity <= 0) {
          // If quantity is 0 or less, remove item from cart
          state.items = state.items.filter(cartItem => cartItem.name !== item.name);
        } else {
          // Update the quantity to the new amount
          existingItem.quantity = newQuantity;
        }
      }
    },
  },
});

// Export action creators
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export reducer as default
export default CartSlice.reducer;
