import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './cartSlice'
import usersReducer from './usersSlice'

export default configureStore({
  reducer: {
    cart: cartReducer,
    users: usersReducer
  }
})