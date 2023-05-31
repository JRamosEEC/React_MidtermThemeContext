import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = []

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    AddedToCart: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(userId, productId, productTitle) {
        return {
          payload: {
            id: nanoid(),
            productId: productId,
            productTitle: productTitle,
            user: userId,
          }
        }
      }
    },
  }
})

export const { AddedToCart } = cartSlice.actions

export default cartSlice.reducer