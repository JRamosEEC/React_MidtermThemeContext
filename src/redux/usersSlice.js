import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
    id: '0', 
    userName: 'Justin',
  }
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {}
})

export default usersSlice.reducer