import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import type { Product } from '../data/products';

export interface Product {
    id: number;
    _id?: string;
    name: string;
    price: number;
    image: string;
    category?: string;
    description?: string;
    brand?: string;
    rating?: number;
    numReviews?: number;
    countInStock?: number;
}

export interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}

const initialState: CartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }

            state.totalItems += 1;
            state.totalPrice += action.payload.price;
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            const itemIndex = state.items.findIndex(item => item.id === action.payload);

            if (itemIndex !== -1) {
                const item = state.items[itemIndex];
                state.totalItems -= item.quantity;
                state.totalPrice -= item.price * item.quantity;
                state.items.splice(itemIndex, 1);
            }
        },

        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const item = state.items.find(item => item.id === action.payload.id);

            if (item) {
                const quantityDiff = action.payload.quantity - item.quantity;
                item.quantity = action.payload.quantity;
                state.totalItems += quantityDiff;
                state.totalPrice += item.price * quantityDiff;

                // Remove item if quantity is 0
                if (item.quantity <= 0) {
                    state.items = state.items.filter(i => i.id !== item.id);
                }
            }
        },

        incrementQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);

            if (item) {
                item.quantity += 1;
                state.totalItems += 1;
                state.totalPrice += item.price;
            }
        },

        decrementQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);

            if (item && item.quantity > 1) {
                item.quantity -= 1;
                state.totalItems -= 1;
                state.totalPrice -= item.price;
            }
        },

        clearCart: (state) => {
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
