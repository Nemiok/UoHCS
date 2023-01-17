import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterAction(state, action) {
      const filterValue = action.payload
      return filterValue
    },
  }
})

export const { setFilterAction } = filterSlice.actions
export default filterSlice.reducer